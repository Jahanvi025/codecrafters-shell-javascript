const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ "
});

// List of built-in commands
const builtins = ['echo', 'exit', 'type'];

// This function will continuously prompt for user input
function prompt() {
  rl.question("$ ", (answer) => {
    const command = answer.trim().split(' ')[0]; // Get the first word of the command

    if (answer.startsWith('type ')) {
      // Handle 'type' command
      if (builtins.includes(command)) {
        console.log(`${command} is a shell builtin`);
      } else {
        console.log(`${command}: not found`);
      }
    } else if (answer.trim() === "exit 0") {
      // Handle 'exit 0' command
      console.log("Exiting the shell...");
      rl.close();
      process.exit(0);
    } else if (builtins.includes(command)) {
      // Handle other built-in commands like echo, exit, type
      console.log(`${command} is a shell builtin`);
    } else {
      // Handle unrecognized commands
      console.log(`${command}: not found`);
    }

    prompt(); // Continue prompting for input
  });
}

// Start the first prompt
prompt();
