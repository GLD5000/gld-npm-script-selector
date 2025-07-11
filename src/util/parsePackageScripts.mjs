import * as fs from "fs";
import { selectLineFromStringArray } from "@gld5000-cli/readline";
import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

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
  const relativePath = returnToRoot(selectedScriptObject);
  console.log("relativePath", relativePath);
  return relativePath;
}
/**
 *Returns ../ suffix to get back to the src folder
 */
function returnToRoot(selectedScriptObject) {
  const targetPath = selectedScriptObject.script.split(" ").at(-1);
  console.log("targetPath", targetPath);
  const workingDir = __dirname;//process.cwd();
  console.log("workingDir", workingDir);
  
  return path.relative(workingDir, targetPath).replaceAll('\\','/');
  // const subDirectories = __dirname.split("node_modules").at(-1);
  // const returnString = `../${subDirectories.replaceAll(/([\\\/]+[^\\\/]+)/g, "../")}`;
  // return `${returnString}${targetPath}`;
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
}
export async function runSelectedScript() {
  const packageScriptObject = getPackageScriptObject();
  const command = await selectNpmScript(packageScriptObject);
  await executeScript(command);
}
