import { parsePackageScripts } from "../src/util/parsePackageScripts.mjs";

const scripts = parsePackageScripts();
console.log('scripts:', scripts);