const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const searchParams = {
    owner,
  };
  if (favorite) {
    searchParams.favorite = favorite;
  }
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find(searchParams, "", { skip, limit }).populate(
    "owner",
    "email name"
  );
  res.json(allContacts);
};

module.exports = getAllContacts;
