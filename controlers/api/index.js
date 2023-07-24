const fs = require("fs");
const path = require("path");
const currentDirectory = __dirname;

function getFunctionFileNames() {
  const files = fs.readdirSync(currentDirectory);
  return files.filter(
    (file) => path.extname(file) === ".js" && file !== "index.js"
  );
}

const functions = getFunctionFileNames().reduce((acc, fileName) => {
  const functionName = path.parse(fileName).name;
  acc[functionName] = require(`./${fileName}`);
  return acc;
}, {});

module.exports = functions;
