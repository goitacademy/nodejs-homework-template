const Contact = require("../../models/schema");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(contacts);
};

module.exports = getAll;
