const getListContacts = require("./getListContacts");

const getContactById = async (contactId) => {
  try {
    const contacts = await getListContacts();
    const contact = contacts.find((item) => item.id === Number(contactId));
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getContactById;