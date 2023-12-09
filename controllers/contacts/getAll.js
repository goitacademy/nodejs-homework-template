const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };

  if (favorite === "true") {
    query.favorite = true;
  }

  const result = await Contact.find(query, "", {
    skip,
    limit,
  }).populate("owner", "email -_id");
  res.json(result);
};

module.exports = getAll;
