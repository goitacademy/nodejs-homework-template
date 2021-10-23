const getAll = require("./listContacts");

const getContactById = async (contactId) => {
  try {
    const contacts = await getAll();
    const contactById = contacts.find(({ id }) => id === contactId);

    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (err) {
    return err.message;
  }
};

module.exports = getContactById;
