const fs = require("fs");
const path = require("path");
const readline = require("readline");

let filePath = path.join(__dirname, "text.txt");
let writableStream = fs.createWriteStream(filePath);

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Write your text:", (text) => {
  writableStream.write(text, (err) => {
    if (err) throw err;
  });
});

rl.on("line", (text) => {
  if (text === "exit") rl.close();
  writableStream.write(`\n${text}`, (err) => {
    if (err) throw err;
  });
});

rl.on("close", () => {
  console.log("Operation completed");
  process.exit();
});
