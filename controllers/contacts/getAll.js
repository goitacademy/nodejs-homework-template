const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  // pagination
  console.log(req.query);
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
  res.json(result);
};

module.exports = getAll;
