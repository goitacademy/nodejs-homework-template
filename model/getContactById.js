const listContacts = require("./listContacts");

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === Number(id));

    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

module.exports = getContactById;
