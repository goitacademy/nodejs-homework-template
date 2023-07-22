const contacts = require("../service");
const { HttpError } = require("../helper");

const addContact = async (req, res, next) => {
  const { body } = req;
  const response = await contacts.addContact(body);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(201).json(response);
};

module.exports = addContact;
