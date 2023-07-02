const Contact = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  // const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
  //   skip,
  //   limit,
  // }).populate("owner", "name email");
  const result = await Contact.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = listContacts;
