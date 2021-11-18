const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../contacts.json");

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const updateContact = async (id, data) => {
  const contacts = await readData();
  const idx = contacts.find((contact) => contact.id.toString() === id);

  if (idx === -1) {
    return null;
  }

  const updated = contacts.map((contact) => {
    if (contact.id.toString() === id) {
      return {
        ...idx,
        ...data,
      };
    } else return contact;
  });
  console.log("IDX", contacts[idx]);

  await fs.writeFile(contactsPath, JSON.stringify(updated, null, 2));
  return {
    ...idx,
    ...data,
  };
};

module.exports = updateContact;
