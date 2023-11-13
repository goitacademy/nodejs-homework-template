const fs = require("fs/promises");
const path = require("path");

const tasksPath = path.join(__dirname, "..","models", "contacts.json"); 

const readDB = async () => {
  const rawJSON = await fs.readFile(tasksPath);

  return JSON.parse(rawJSON);
};

const writeDb = async (data) => {
  await fs.writeFile(tasksPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDb };
