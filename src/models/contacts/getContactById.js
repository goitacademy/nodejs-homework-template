const getAllContacts = require("./getAllContacts");

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const currentContact = contacts.find(
      (item) => String(item.id) === String(contactId)
    );
    if (!currentContact) {
      return null;
    }
    return currentContact;
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = getContactById;