const { Contact } = require("../../db");
const { httpError } = require("../../helpers");

const addContact = async (body) => {
  const contact = new Contact({ ...body });

  try {
    await contact.save();
  } catch (error) {
    throw httpError(400, error.message);
  }
  return contact;
};

module.exports = {
  addContact,
};
