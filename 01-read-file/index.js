"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

let readableStream = fs.createReadStream(
  path.join(__dirname, "text.txt"),
  "utf8"
);

readableStream.on("data", (chunk) => {
  console.log(chalk.blue(chunk));
});
