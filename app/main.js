const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ "
});

// List of built-in commands
const builtins = ['echo', 'exit', 'type'];

// Function to search for command in PATH directories
function findExecutable(command) {
  const paths = process.env.PATH.split(":"); // Get the directories from PATH
  for (const dir of paths) {
    const fullPath = path.join(dir, command);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile() && fs.accessSync(fullPath, fs.constants.X_OK) === undefined) {
      return fullPath; // Return the path if executable is found
    }
  }
  return null; // If not found, return null
}

// This is the function that handles the prompt and user input
function prompt() {
  rl.question("$ ", (answer) => {
    const args = answer.trim().split(' ');
    const command = args[0]; // The command name

    // Handle 'type' command
    if (command === "type") {
      const targetCommand = args[1]; // The command we are checking

      if (!targetCommand) {
        console.log("type: missing argument");
      } else if (builtins.includes(targetCommand)) {
        // Check if it's a built-in command
        console.log(`${targetCommand} is a shell builtin`);
      } else {
        // Search in PATH for executable command
        const executablePath = findExecutable(targetCommand);
        if (executablePath) {
          console.log(`${targetCommand} is ${executablePath}`);
        } else {
          console.log(`${targetCommand}: not found`);
        }
      }
    } else if (command === "echo") {
      // Handle echo command
      console.log(answer.slice(5)); // Extract everything after 'echo '
    } else if (command === "exit" && args[1] === "0") {
      // Handle exit 0 command
      rl.close();
      process.exit(0);
    } else {
      // Handle invalid commands
      console.log(`${answer}: command not found`);
    }

    prompt(); // Continue prompting for input
  });
}

// Start the first prompt
prompt();
