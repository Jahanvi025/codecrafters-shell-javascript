const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ "
});

rl.prompt();

rl.question("$ ", (answer) => {
  console.log(`${answer}: command not found\n`);
  rl.close();
});

rl.on("line", (input) => {
  console.log(`${input}: command not found`);
  rl.prompt();
 });