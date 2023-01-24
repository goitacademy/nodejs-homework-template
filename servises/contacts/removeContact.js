const { Contact } = require("../../models/modelContact");

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  removeContact,
};
