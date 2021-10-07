const updateContacts = require("./updateContacts");
const getAll = require("./getAll");

const removeById = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await updateContacts(contacts);
  return true;
};

module.exports = removeById;
