const updateContacts = require("./updateContacts");
const getAll = require("./getAll");

const updateById = async (id, data) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateById;
