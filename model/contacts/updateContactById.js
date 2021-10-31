const readContact = require("./readContact");
const updateContacts = require("./updateContacts");

const updateContactById = async (id, body) => {
  const contacts = await readContact();

  const idx = contacts.findIndex((item) => Number(item.id) === Number(id));
  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...contacts[idx], ...body };
  await updateContacts(contacts);
  return contacts[idx];
};
module.exports = updateContactById;
