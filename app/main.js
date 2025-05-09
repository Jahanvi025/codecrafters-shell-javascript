const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require('node:child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ "
});

// Function to handle invalid commands
function handleInvalid(answer) {
  rl.write(`${answer}: command not found\n`);
}

// Function to handle 'exit' command
function handleExit() {
  rl.close();
}

// Function to handle 'echo' command
function handleEcho(answer) {
  rl.write(`${answer.split(" ").slice(1).join(" ")}\n`);
}

// Function to handle 'type' command
function handleType(answer) {
  const command = answer.split(' ')[1];
  const builtins = ['echo', 'exit', 'type'];

  if (builtins.includes(command.toLowerCase())) {
    rl.write(`${command} is a shell builtin\n`);
  } else {
    const paths = process.env.PATH.split(":");
    for (const pathEnv of paths) {
      let destPath = path.join(pathEnv, command);
      if (fs.existsSync(destPath) && fs.statSync(destPath).isFile()) {
        rl.write(`${command} is ${destPath}\n`);
        return;
      }
    }
    rl.write(`${command}: not found\n`);
  }
}

function handleFile(answer) {
  const fileName = answer.split(' ')[0];  // Get the program name
  const args = answer.split(' ').slice(1); // Get the arguments for the program
  const paths = process.env.PATH.split(":");  // Get the directories in PATH

  // Look through all directories in PATH to find the executable
  for (const pathEnv of paths) {
    let destPath = path.join(pathEnv, fileName); // Join the path with the executable
    if (fs.existsSync(destPath) && fs.statSync(destPath).isFile()) {
     
      // Execute the program with the given arguments
      execFileSync(destPath, args, { encoding: 'utf-8', stdio: 'inherit' });

    }
    return;
  }
  // If the executable is not found, print command not found
  console.log(`${fileName}: command not found\n`);
}

// This function will handle the prompt and user input
function prompt() {
  rl.question("$ ", (answer) => {
    if (answer.startsWith("invalid")) {
      handleInvalid(answer);
      prompt();
    } else {
      switch (answer.split(" ")[0].toLowerCase()) {
        case "exit":
          handleExit();
          break;
        case "echo":
          handleEcho(answer);
          prompt();
          break;
        case "type":
          handleType(answer);
          prompt();
          break;
        default:
          handleFile(answer);
          prompt();
      }
    }
  });
}

// Start the first prompt
prompt();
