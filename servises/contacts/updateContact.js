const { Contact } = require("../../models/modelContact");

const updateContact = async (contactId, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );

    return contact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  updateContact,
};
