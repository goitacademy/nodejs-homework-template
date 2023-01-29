const { Contact } = require("../../models/modelContact");

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    
    await newContact.save();
    return newContact;
  } catch (err) {
    console.error("error!!!  :", err);
  }
};

module.exports = {
  addContact,
};
