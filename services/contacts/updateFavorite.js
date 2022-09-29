const { ContactModel } = require("../../models/contact");

const updateFavorite = async (contactId, favorite, userId) => {
  const data = await ContactModel.findByIdAndUpdate(contactId, favorite, {
    owner: userId,
    new: true,
  });
  return data;
};

module.exports = updateFavorite;
