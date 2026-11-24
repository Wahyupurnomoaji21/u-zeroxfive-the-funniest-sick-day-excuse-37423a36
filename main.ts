import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The Funniest Sick-Day Excuse — one line, under 200 characters.
// A half-believable mishap (a sneeze throwing out a back really happens),
// a fresh image instead of the worn fever/dog/grandmother excuses, and the
// laugh landing near the end, in the voice of a real person typing a message.
const ENTRY =
  "Can't come in today \u2014 I sneezed so hard my back went out and now I'm stuck bent over like a garden gnome. Doctor's orders: lie flat.";

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(dirname(fileURLToPath(import.meta.url)), "output");
const entryPath = join(outputDir, "entry.txt");

// Enforce the competition gate locally: 1 to 200 characters, not only
// whitespace, single line, valid UTF-8 text.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, gate requires 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
// Written byte-for-byte with no trailing newline: the gate counts every
// character, so the file holds exactly the entry and nothing else.
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`wrote ${entryPath} (${ENTRY.length} chars)`);
console.log(ENTRY);
