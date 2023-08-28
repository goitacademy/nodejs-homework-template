const contactsBook = require("../../models/contacts.js");

const getAll = async (_, res, next) => {
  try {
    const result = await contactsBook.find().exec();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
