const { Contact } = require("../models");
const updateFavoriteContact = async (id, favorite) => {
  const contact = Contact.findByIdAndUpdate(id, favorite, { new: true });
  return contact;
};

module.exports = updateFavoriteContact;
