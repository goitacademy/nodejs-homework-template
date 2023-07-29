const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite
    ? { owner: req.user._id, favorite }
    : { owner: req.user._id };

  const data = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(data);
};
module.exports = getAll;
