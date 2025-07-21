/**
 * Splits script string concurrent / sequential commands
 *
 * @export
 * @param {string} scriptString
 * @returns {string[]}
 */
export function splitScript(scriptString) {
  return scriptString.trim().split(/&+/);
}

