const fs = require("fs/promises");
const path = require("path");
const { readContent, contactPath } = require("./readContent");

const updateContact = async (contactId, body) => {
  const contacts = await readContent();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(
      path.join(contactPath),
      JSON.stringify(contacts, null, 2)
    );
    return updatedContact;
  }
  return null;
};

module.exports = updateContact;
