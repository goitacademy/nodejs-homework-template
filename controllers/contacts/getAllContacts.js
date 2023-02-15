const { Contacts } = require("../../model");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contacts.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.status(200), res.json(contacts);
};

module.exports = getAllContacts;
