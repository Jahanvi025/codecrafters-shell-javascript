const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ "
});

// This is the function that handles the prompt and user input
function prompt() {
  rl.question("$ ", (answer) => {
     // Check if the command is 'echo'
     if (answer.startsWith("echo ")) {
      // Extract everything after 'echo ' and print it
      console.log(answer.slice(5)); // 5 because 'echo ' is 5 characters long
    } else if (answer.trim() === "exit 0") {
      // Handle 'exit 0' command
      rl.close();
      process.exit(0);
    } else {
      // Handle invalid commands
      console.log(`${answer}: command not found`);
    }
    
    prompt(); 
  });
}

// Start the first prompt
prompt();
