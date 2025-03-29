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
    if(answer.trim() === "exit 0"){
      console.log("Exiting...");
      rl.close(); // Close the readline interface
      process.exit(0); // Exit the process with status 0
    }
    else{
      console.log(`${answer}: command not found`);
      prompt(); // Recursive call to continue prompting for input
    }
  });
}

// Start the first prompt
prompt();
