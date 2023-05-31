const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  // console.log(req.query)
  const skip = (page - 1) * limit;
  const query = { owner };
  // console.log(query)
  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }
  const results = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email subscription");
  res.json(results);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
