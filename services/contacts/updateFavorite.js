const Contact = require("../../models/contacts");

const updateFavoriteContact = async (contactId, body) => {
  const { favorite } = body;
  const result = await Contact.findOneAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  );

  return result;
};

module.exports = updateFavoriteContact;
