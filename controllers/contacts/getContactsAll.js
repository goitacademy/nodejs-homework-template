const { Contact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit,
  }).populate("owner", "name email subscription");
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
