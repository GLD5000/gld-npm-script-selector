import { runSelectedScript } from "./util/selectPackageScripts.mjs";
import { logTimestampArrow } from "@gld5000k/timestamp";

export async function runSelector(packageFilePath) {
  logTimestampArrow();
  await runSelectedScript(packageFilePath);
}
