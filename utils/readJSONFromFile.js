const fs = require("fs/promises");

const readJSONFromFile = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);

  return jsonData;
};

module.exports = {
  readJSONFromFile,
};
