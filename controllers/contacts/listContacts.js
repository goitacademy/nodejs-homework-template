const Contact = require("../../models/contacts");

const listContacts = async (_, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
