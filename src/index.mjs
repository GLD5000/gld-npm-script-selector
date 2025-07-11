import { runSelectedScript } from "../src/util/parsePackageScripts.mjs";
import { logTimestampArrow } from "@gld5000k/timestamp";

export async function runSelector() {
  logTimestampArrow();
  await runSelectedScript();
}
