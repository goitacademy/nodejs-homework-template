const fs = require("fs/promises");
const getAll = require("./getAll");
const contactsPath = require("./contactsPath");

const remove = async (id, data) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeItem] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeItem;
};

module.exports = remove;
