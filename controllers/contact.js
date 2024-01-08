const { ctrlWrapper } = require("../helpers");
const Contact = require("../models/contact");

const getAll = async (req, res, next) => {
  const books = await Contact.find();
  res.json(books);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
