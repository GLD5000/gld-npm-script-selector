import { answerStringQuestion } from "@gld5000-cli/readline";
console.log("hello");
try {
  const name = await answerStringQuestion("What is your name");
  console.log(name);
} catch (error) {
  console.log(JSON.stringify(error));
}
