const { Contact } = require("../../models/contact");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.json(result);
};

module.exports = getListContacts;
