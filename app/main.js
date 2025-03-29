const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("$ ", (answer) => {
  console.log(`${answer}: command not found\n`);
  rl.close();
});

function prompt() {
  rl.question("$ ", (answer) => {
    console.log(`${answer}: command not found`);
    prompt(); // Recursively call the function to keep the loop going
  });
}
prompt();