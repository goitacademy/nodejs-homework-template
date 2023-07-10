const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) filter.favorite = favorite;

  const result = await Contact.find(filter, "-createdAt -updatedAt", null, {
    skip,
    limit,
  }).populate("owner", "name email");
  // console.log(result);
  res.json(result);
};
module.exports = getAll;
