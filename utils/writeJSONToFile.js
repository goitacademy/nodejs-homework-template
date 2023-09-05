const fs = require("fs/promises");

const writeJSONToFile = async (filePath, data) => {
  const formatData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, formatData);
};

module.exports = {
  writeJSONToFile,
};
