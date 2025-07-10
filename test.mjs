import { runSelector } from "./bin/index.mjs";
runSelector();

// import * as util from 'node:util';
// import { exec } from "node:child_process";
// import path from "path";
// //echoTest
// const awaitableExec = util.promisify(exec);
// const command = `node ${path.join( "bin", "index.mjs")}`;//process.cwd(),
// console.log(command);
// await awaitableExec(command, (error, stdout, stderr) => {
//   //process.cwd()
//   if (error) {
//     console.error(`Error: ${error}`);
//     return;
//   }
//   if (stdout) {
//     console.log("stdout", stdout);
//   }

//   if (stderr) {
//     console.log(`Error: ${stderr}`);
//   }
// });
//echoTest
// exec(`npm run echoTest`, (error, stdout, stderr) => {
//   //process.cwd()
//   if (error) {
//     console.error(`Error: ${error}`);
//     return;
//   }
//   if (stdout) {
//     console.log("stdout", stdout);
//   }

//   if (stderr) {
//     console.log(`FFmpeg output: ${stderr}`);
//   }
// });
