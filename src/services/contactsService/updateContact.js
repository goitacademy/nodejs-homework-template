const { Contact } = require("../../db");

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, {
    $set: { ...body },
  });
  return contact;
};

module.exports = {
  updateContact,
};
