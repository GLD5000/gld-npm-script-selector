import * as fs from "fs";
const packageJsonContent = fs.readFileSync('./package.json', 'utf8');
const {scripts} = JSON.parse(packageJsonContent)
console.log('scripts:', scripts);