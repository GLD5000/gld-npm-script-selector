import * as fs from "fs";
import { exec } from "node:child_process";

/**
 *
 * @returns {Record<string,Record<string,string>>}
 */
export function getPackageScriptObject() {
  const packageJsonContent = fs.readFileSync("./package.json", "utf8");
  const { scripts } = JSON.parse(packageJsonContent);
  return Object.entries(scripts).reduce(scriptReducer, {});
  function scriptReducer(acc, curr) {
    const [key, value] = curr;
    const isComment = `${key}`.startsWith("//");
    if (isComment) {
      const scriptKey = key.replace("//", "");
      if (!acc.hasOwnProperty(scriptKey)) acc[scriptKey] = {};
      acc[scriptKey].comment = value;
    } else {
      if (!acc.hasOwnProperty(key)) acc[key] = {};
      acc[key].script = value;
    }
    return acc;
  }
}
/**
 *
 * @param {string} command
 */
function executeScript(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return JSON.stringify(error);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
