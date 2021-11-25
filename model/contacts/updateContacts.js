const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("");

const updateContacts = async (contacts) => {
  await fs.writeFile(
    `${contactsPath}/model/contacts.json`,
    JSON.stringify(contacts)
  );
};

module.exports = updateContacts;
