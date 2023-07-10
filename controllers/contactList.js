const { Contact } = require("../models/index.js");
const { ctrlWrapper } = require("../helpers/index.js");

const contactList = async (req, res) => {
  console.log(Contact.find);
  const result = await Contact.find({}, "-createdAt -updateAt");

  res.json(result);
};
module.exports = {
  contactList: ctrlWrapper(contactList),
};
