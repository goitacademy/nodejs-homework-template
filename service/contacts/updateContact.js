const { ContactModel } = require("../../models/contactsModel");

const updateContact = async (contactId, body) => {
  try {
    await ContactModel.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    const data = await ContactModel.findById(contactId);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = 
  updateContact
