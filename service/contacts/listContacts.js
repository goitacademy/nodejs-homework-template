const { ContactModel } = require("../../models/contactsModel");

const listContacts = async () => {
  try {
    const data = await ContactModel.find({});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = listContacts;
