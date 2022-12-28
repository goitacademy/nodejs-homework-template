const { ContactModel } = require("../../models/contactsModel");

const removeContact = async (contactId) => {
  try {
    const data = await ContactModel.findByIdAndRemove(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = removeContact;
