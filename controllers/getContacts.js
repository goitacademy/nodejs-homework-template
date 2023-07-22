const contacts = require("../service");
const { HttpError } = require("../helper");

const getContacts = async (req, res, next) => {
  const response = await contacts.listContacts();
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

module.exports = getContacts;
