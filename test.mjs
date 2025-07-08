import { exec } from "node:child_process";
import path from "path";
//echoTest
exec(`node ${path.join(process.cwd(),"bin", "index.mjs")}`, (error, stdout, stderr) => {
  //process.cwd()
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stdout) {
    console.log("stdout", stdout);
  }

  if (stderr) {
    console.log(`FFmpeg output: ${stderr}`);
  }
});
//echoTest
exec(`npm run echoTest`, (error, stdout, stderr) => {
  //process.cwd()
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stdout) {
    console.log("stdout", stdout);
  }

  if (stderr) {
    console.log(`FFmpeg output: ${stderr}`);
  }
});
