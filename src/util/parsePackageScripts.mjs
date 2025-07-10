import * as fs from "fs";
import { exec } from "node:child_process";
import { selectLineFromStringArray } from "@gld5000-cli/readline";
import * as util from "node:util";
import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const awaitableExec = util.promisify(exec);

/**
 *
 * @returns {Record<string,Record<string,string>>}
 */
function getPackageScriptObject() {
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
 * @param {Record<string,Record<string,string>>} packageScriptObject
 */
async function selectNpmScript(packageScriptObject) {
  const lines = getScriptStringArray(packageScriptObject);
  const selectedLine = await selectLineFromStringArray(lines);
  const selectedScriptObject = packageScriptObject[selectedLine.split(": ")[0]];
  // return `npm run ${selectedLine.split(": ")[0]}`
  const relativePath = `${returnToRoot()}${
    selectedScriptObject.script.split(" ").at(-1)
  }`;
  console.log("relativePath", relativePath);
  return relativePath;
}
/**
 *Returns ../ suffix to get back to the src folder
 */
function returnToRoot() {
  console.log("__dirname", __dirname);
  const subDirectories = __dirname.split("src")[1];
  console.log("subDirectories", subDirectories);
  const returnString = `../${subDirectories.replaceAll(/([\\\/]+\w+)/g, "../")}`;
  console.log("returnString", returnString);
  return returnString;
}
/**
 *
 * @param {Record<string,Record<string,string>>} packageScriptObject
 * @returns {string[]}
 */
function getScriptStringArray(packageScriptObject) {
  return Object.entries(packageScriptObject).map((entry) => {
    const [key, { comment }] = entry;
    return `${key}${comment ? `: ${comment}` : ""}`;
  });
}
/**
 *
 * @param {string} command
 */
async function executeScript(command) {
  try {
    await import(command);
  } catch (error) {
    console.log(error);
  }
  // await awaitableExec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return JSON.stringify(error);
  //   }
  // if (stdout) {
  //   console.log("stdout", stdout);
  // }

  // if (stderr) {
  //   console.log(`Error: ${stderr}`);
  // }  });
}
export async function runSelectedScript() {
  const packageScriptObject = getPackageScriptObject();
  const command = await selectNpmScript(packageScriptObject);
  console.log("command", command);
  await executeScript(command);
}
