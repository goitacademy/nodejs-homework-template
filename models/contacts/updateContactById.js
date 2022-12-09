const listContacts = require("./listContacts");
const updateContacts = require("./updateContact");

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id.toString());
  if (index === -1) {
    return null;
  }
  
  const elementForUpdate = { ...contacts[index], ...data };

  contacts[index] = elementForUpdate;
  
  await updateContacts(contacts);
  return contacts[index] ;
}

module.exports = updateContactById;