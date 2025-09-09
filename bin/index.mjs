#!/usr/bin/env node

import { runSelectedScript } from "../src/util/selectPackageScripts.mjs";
import { logTimestampArrow } from "@gld5000k/timestamp";

  logTimestampArrow();
  await runSelectedScript(process.argv[2], process.argv[3]);
