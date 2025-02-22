const Contact = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");
const getAll = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user.id }).exec();
  res.status(200).json(contacts);
};
module.exports = { getAll: ctrlWrapper(getAll) };
