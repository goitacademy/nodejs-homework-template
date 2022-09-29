const { ContactModel } = require("../../models/contact");

const updateFavorite = async (contactId, favorite) => {
  const data = await ContactModel.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });
  return data;
};

module.exports = updateFavorite;
