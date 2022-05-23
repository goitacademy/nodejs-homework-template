const fs = require("fs/promises");
const path = require("path");
const { readContent, contactPath } = require("./readContent");

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(
      path.join(contactPath),
      JSON.stringify(contacts, null, 2)
    );
    return result;
  }
  return null;
};

module.exports = removeContact;
