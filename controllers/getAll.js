const { Contact } = require("../models/contactsShema");

const getAll = async (req, res) => {
  console.log("getAll!");
  const result = await Contact.find({});
  res.json(result);
};

module.exports = getAll;
