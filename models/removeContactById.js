const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const removeContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = removeContactById;
