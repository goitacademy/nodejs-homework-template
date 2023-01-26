const fs = require("fs/promises");
const getAll = require("./getAll");
const contactsPath = require("./contactsPath");

const update = async (id, data) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = update;
