const { listContacts } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = getAllContacts;
