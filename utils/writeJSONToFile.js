const fs = require("fs/promises");

const writeJSONToFile = async (filePath, data) => {
  try {
    const formatData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, formatData);
  } catch (error) {
    console.error("Error writing JSON from a file:", error.message);
  }
};

module.exports = {
  writeJSONToFile,
};
