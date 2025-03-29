const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ "
});

// This is the function that handles the prompt and user input
function prompt() {
  rl.question("$ ", (answer) => {
    // Process the input, here it's always a 'command not found' message
    console.log(`${answer}: command not found`);
    prompt(); // Recursive call to continue prompting for input
  });
}

// Start the first prompt
prompt();
