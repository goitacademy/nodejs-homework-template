const { readFile } = require("fs/promises");

const readJsonFile = async (path) => {
  const content = (await readFile(path)).toString();
  console.log(content);
  return JSON.parse(content);
};

module.exports = readJsonFile;
