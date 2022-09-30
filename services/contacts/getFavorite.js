const { ContactModel } = require("../../models/contact");

const getFavorite = async (userId, skip, limit) => {
  const data = await ContactModel.find({ favorite: true, owner: userId }, "", {
    skip,
    limit: Number(limit),
  });
  return data;
};

module.exports = getFavorite;
