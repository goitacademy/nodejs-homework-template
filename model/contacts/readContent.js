const fs = require("fs/promises");
const path = require("path");

const contactPath = path.join(__dirname, "db", "contacts.json");

const readContent = async () => {
  try {
    const content = await fs.readFile(contactPath, "utf8");
    const result = JSON.parse(content);
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { readContent, contactPath };
