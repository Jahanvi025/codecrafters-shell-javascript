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
    const args = answer.trim().split(' '); // Split the input into arguments
    const command = args[0]; // The first word is the command

    switch (command) {
      case "type":
        // Handle 'type' command
        if (args.length === 1) {
          // If the user types just 'type'
          console.log("type is a shell builtin");
        } else {
          const targetCommand = args[1]; // The second word is the target command
          if (builtins.includes(targetCommand)) {
            console.log(`${targetCommand} is a shell builtin`);
          } else {
            console.log(`${targetCommand}: not found`);
          }
        }
        break;

      case "echo":
      case "exit":
        // Handle 'echo' and 'exit' commands as shell built-ins
        console.log(`${command} is a shell builtin`);
        break;

      case "exit":
        // If the user types 'exit', we close the interface and exit the process with status 0
        rl.close();
        process.exit(0);
        break;

      default:
        // Handle unrecognized commands
        console.log(`${command}: not found`);
        break;
    }

    prompt(); // Continue prompting for input
  });
}

// Start the first prompt
prompt();
