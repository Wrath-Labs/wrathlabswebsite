/**
 * Turns the raw JSON in `/content` into the values the site renders.
 *
 * Two jobs, both done once at build time:
 *
 *  1. Cross-references. Any string may contain `{{brand.email}}` — a dotted
 *     path into the content tree. It is replaced with that value, recursively,
 *     so one edit propagates everywhere the token is used. This is what lets
 *     `content/README.md` promise "change it in one place".
 *
 *  2. Comments. JSON has none, so editors leave notes in keys beginning with
 *     `_`. Those are stripped here — both from the value and (via `StripNotes`)
 *     from its type, so a note can never leak into the DOM or a prop spread.
 *
 * A bad token throws rather than rendering `{{brnad.name}}` to a visitor. The
 * message names the file, the field, and the likely fix, because the person who
 * caused it is probably editing JSON, not TypeScript.
 */

/** Recursively drops `_`-prefixed keys from a type, mirroring `strip` below. */
export type StripNotes<T> = T extends readonly (infer U)[]
  ? StripNotes<U>[]
  : T extends object
    ? {
        [K in keyof T as K extends `_${string}` ? never : K]: StripNotes<T[K]>;
      }
    : T;

const TOKEN = /\{\{\s*([\w.$-]+)\s*\}\}/g;

type Unknown = Record<string, unknown>;

/** `a.b.0.c` → the value at that path, or undefined. Array indices work. */
function lookup(path: string, root: Unknown): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node === null || node === undefined
          ? undefined
          : (node as Unknown)[key],
      root,
    );
}

function fail(where: string, message: string): never {
  throw new Error(`Content error in ${where}: ${message}`);
}

function expand(
  input: string,
  root: Unknown,
  where: string,
  trail: readonly string[],
): string {
  return input.replace(TOKEN, (_match, path: string) => {
    if (trail.includes(path)) {
      fail(
        where,
        `{{${path}}} refers back to itself (${[...trail, path].join(
          " → ",
        )}). Point one of them at a plain piece of text instead.`,
      );
    }

    const value = lookup(path, root);

    if (value === undefined || value === null) {
      const top = path.split(".")[0];
      const known = Object.keys(root)
        .filter((k) => !k.includes("-"))
        .sort()
        .join(", ");
      fail(
        where,
        `{{${path}}} doesn't exist.${
          top in root
            ? ` "${top}" is a file, so check the part after it — open content/${top}.json and follow the names down.`
            : ` The part before the first dot must be one of: ${known}.`
        }`,
      );
    }

    if (typeof value === "object") {
      fail(
        where,
        `{{${path}}} points at a whole group of settings, not a single piece of text. Add the name of the field you want on the end, e.g. {{${path}.title}}.`,
      );
    }

    // Tokens may themselves contain tokens (brand.tagline.full is built this
    // way), so keep expanding until the string is literal.
    return expand(String(value), root, where, [...trail, path]);
  });
}

function strip(value: unknown, root: Unknown, where: string): unknown {
  if (typeof value === "string") return expand(value, root, where, []);
  if (Array.isArray(value)) {
    return value.map((item, i) => strip(item, root, `${where}[${i}]`));
  }
  if (value !== null && typeof value === "object") {
    const out: Unknown = {};
    for (const [key, child] of Object.entries(value)) {
      if (key.startsWith("_")) continue; // an editor's note
      out[key] = strip(child, root, `${where}.${key}`);
    }
    return out;
  }
  return value;
}

/**
 * `files` is keyed by content file — `{ brand, navigation, ... }`. Tokens may
 * address a file by either spelling of its name, so `{{case-studies.items.0}}`
 * and `{{caseStudies.items.0}}` both resolve; editors reach for the filename,
 * code reaches for the identifier.
 */
export function resolveContent<T extends Unknown>(files: T): StripNotes<T> {
  const root: Unknown = { ...files };

  for (const [key, value] of Object.entries(files)) {
    const kebab = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    const camel = key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    if (!(kebab in root)) root[kebab] = value;
    if (!(camel in root)) root[camel] = value;
  }

  const out: Unknown = {};
  for (const [key, value] of Object.entries(files)) {
    const kebab = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    out[key] = strip(value, root, `content/${kebab}.json`);
  }

  return out as StripNotes<T>;
}
