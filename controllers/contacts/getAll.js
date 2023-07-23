const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite !== undefined) {
    query.favorite = favorite;
  }
  const allContacts = await Contact.find(query, "-__v", { skip, limit }).populate("owner", "name, email");
  res.json(allContacts);
};

module.exports = getAll;
