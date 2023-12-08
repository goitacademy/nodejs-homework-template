const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");

const getContactList = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

module.exports = {
  getContactList: ctrlWrapper(getContactList),
};
