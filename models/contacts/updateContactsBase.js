const fs = require("fs/promises");
const contactsFilePath = require("./contactsFilePath");

const updateContactsBase = async (instance) => {
  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateContactsBase;
