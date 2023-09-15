const { Contact } = require("../models/contact");

const getAllListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const favoriteFilter = favorite ? { owner, favorite } : { owner };
  const result = await Contact.find(favoriteFilter, "-createdAt -updatedAt ", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  res.json(result);
};

module.exports = getAllListContacts;