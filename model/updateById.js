const getAll = require("./listContacts");
const updateContact = require("./updateContact");

const updateById = async (id, body) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id };
  await updateContact(contacts);
  return contacts[idx];
};

module.exports = updateById;
