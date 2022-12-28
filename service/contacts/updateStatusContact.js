const { ContactModel } = require("../../models/contactsModel");

const updateStatusContact = async (contactId, body) => {
    try {
      const data = await ContactModel.findByIdAndUpdate(contactId, body, {
        new: true,
      });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  module.exports = 
    updateStatusContact
