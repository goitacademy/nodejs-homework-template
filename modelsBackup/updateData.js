const filePath = require("./filePath");
const fs = require("fs/promises");

const updateData = async (data) => {
  const newContacts = fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return newContacts;
};

module.exports = updateData;
