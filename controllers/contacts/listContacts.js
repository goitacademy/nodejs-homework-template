const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }
  const result = await Contact.find(filter, "-createdAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

module.exports = listContacts;
