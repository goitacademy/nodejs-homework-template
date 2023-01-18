const { Contact } = require("../../db");

const updateContact = async (id, userId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    {
      $set: { ...body },
    }
  );
  return contact;
};

module.exports = {
  updateContact,
};
