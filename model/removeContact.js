const getAll = require("./listContacts");
const updateContact = require("./updateContact");

const removeContact = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  const removeCnt = contacts.splice(idx, 1);
  await updateContact(contacts);
  return removeCnt;
};

module.exports = removeContact;
