const { ContactModel } = require("../../models/contactsModel");

const getContactById = async (contactId) => {
  try {
    const contact = await ContactModel.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getContactById;
