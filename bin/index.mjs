#!/usr/bin/env node

import { runSelectedScript } from "../src/util/selectPackageScripts.mjs";
import { logTimestampArrow } from "@gld5000k/timestamp";

const argument = process.argv[2];
console.log('argument:', argument);


  logTimestampArrow();
  await runSelectedScript(argument);
