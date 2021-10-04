const fs = require("fs/promises");

const writeContacts = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

module.exports = { writeContacts };
