// One Star, Written in Sap — a one-star review from a neglected houseplant.
// Reads entry.txt and writes the entry text to the output dir given by
// MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR. Node 22, stdlib only, no network,
// no wall clock, deterministic output.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8");
if (entry.length === 0 || entry.replace(/\n$/, "").length >= 280) {
  throw new Error("entry.txt must be non-empty and under 280 characters");
}

const outDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
