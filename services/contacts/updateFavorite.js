const { ContactModel } = require("../../models/contact");

const updateFavorite = async (userId, contactId, favorite) => {
  const data = await ContactModel.findByIdAndUpdate(contactId, favorite, {
    owner: userId,
    new: true,
  });
  return data;
};

module.exports = updateFavorite;
