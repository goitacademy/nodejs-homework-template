const fs = require("fs").promises;

const loadFile = async (filePath) => {
  const file = await fs.readFile(filePath);
  return JSON.parse(file);
};

const saveFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

module.exports = {
  loadFile,
  saveFile,
};
