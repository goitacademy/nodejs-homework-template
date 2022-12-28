const { ContactModel } = require("../../models/contactsModel");

const addContact = async (body) => {
  try {
    const data = await ContactModel.create(body);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addContact;
