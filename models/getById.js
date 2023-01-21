const listContacts = require("./listContacts");

const getById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => String(item.id) === id);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getById;
