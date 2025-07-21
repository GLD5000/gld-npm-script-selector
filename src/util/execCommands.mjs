import path from "path";
import { fileURLToPath } from "url";
import { splitScript } from "./parseScript.mjs";
/**
 * Clears the console
 */
export function clear() {
  console.clear();
}
/**
 * Logs to console
 */
export function echo(message) {
  console.log(message);
}
export async function nodeCommand(targetPath, additionalPath) {
  const relativePath = resolveRelativePath(targetPath, additionalPath);
  try {
    await import(relativePath);
  } catch (error) {
    console.log(error);
  }
}
/**
 * Returns import path from root-relative npm script path
 * E.G. /src/foo.mjs
 * @param {string} targetPath
 * @returns {string}
 */
function resolveRelativePath(targetPath, additionalPath) {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  // console.log("additionalPath", additionalPath);
  // console.log("targetPath", targetPath);
  const resolvedTarget = additionalPath ? path.join(additionalPath, targetPath) : targetPath;
  // console.log("resolvedTarget", resolvedTarget);
  const workingDir = __dirname;
  // console.log("workingDir", workingDir);
  const relativePath = path.relative(workingDir, resolvedTarget).replaceAll("\\", "/");
  // console.log("relativePath", relativePath);
  return relativePath
}
export function getCommandTypeParam(command) {
    console.log(command)
  const commandMatchLookup = ["clear", "echo", "node"];
  let executed = false;
  let currentIndex = 0;
  const endIndex = commandMatchLookup.length - 1;
  while (!executed) {
      const matchString = commandMatchLookup[currentIndex];
      if (command.indexOf(matchString) > -1) {
        console.log(matchString)
      executed = true;
      return {
        param: command.replace(matchString, "").trim(),
        type: matchString,
      };
    } else if (currentIndex === endIndex) {
      executed = true;
      return { param: "", type: "other" };
    }
    currentIndex += 1;
  }
}

async function commandSwitch(type, param, additionalPath) {
  console.log(type);
  switch (type) {
    case "echo":
      echo(param);
      break;
    case "clear":
      clear();
      break;
    case "node":
      await nodeCommand(param, additionalPath);
      break;

    default:
      break;
  }
}

export async function executeScript(script, additionalPath) {
    const commands = splitScript(script);
    console.log(commands);
  for (let i in commands) {
    const command = commands[i];
    const { type, param } = getCommandTypeParam(command);
    await commandSwitch(type, param, additionalPath);
  }
}
