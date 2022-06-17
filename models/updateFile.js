const fs = require("fs/promises");
const filePath = require("./path");

const updateFile = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = updateFile;
