const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  if (!contacts) {
    return null;
  }

  res.status(200).json({
    message: "the request for all contacts was made successfully",
    result: { contacts },
  });
};

module.exports = getAll;
