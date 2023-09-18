const { writeFile } = require('fs/promises');

const writeJSONToFile = async (path, content) => {
  // second and third arguments in JSON.stringify are added for better formatting
  await writeFile(path, JSON.stringify(content, null, 2));
};

module.exports = writeJSONToFile;