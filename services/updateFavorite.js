const { contact } = require("../models");
const { ContactModel } = contact;

const updateFavorite = async (contactId, favorite) => {
  const data = await ContactModel.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });
  return data;
};

module.exports = updateFavorite;
