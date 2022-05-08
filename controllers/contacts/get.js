const { Contact } = require("../../models/contact");
const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");
  res.json({ status: "success", code: 200, result });
};
module.exports = getAll;
