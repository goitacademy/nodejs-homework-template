const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "name email");
  res.status(200).json(result);
};

module.exports = listContacts;