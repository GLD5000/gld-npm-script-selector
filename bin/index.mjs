#!/usr/bin/env node

import { runSelectedScript } from "../src/util/parsePackageScripts.mjs";
import { logTimestampArrow } from "@gld5000k/timestamp";

  logTimestampArrow();
  await runSelectedScript();
