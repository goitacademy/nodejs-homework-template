const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner: _id };

  if (favorite !== undefined) {
    query.favorite = favorite;
  }

  const result = await Contact.find(query, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");

  if (!result) {
    throw createError(404, "not found");
  }

  res.json({ contacts: result });
};

module.exports = getAll;
