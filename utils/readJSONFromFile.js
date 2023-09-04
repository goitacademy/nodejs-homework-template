const fs = require("fs/promises");

const readJSONFromFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    return jsonData;
  } catch (error) {
    console.error("Error reading JSON from file:", error.message);
    return null;
  }
};

module.exports = {
  readJSONFromFile,
};
