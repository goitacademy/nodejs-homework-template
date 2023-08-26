const contactsBook = require("../../models/contacts.js");

const getAll = async (_, res, next) => {
  try {
    const listedContacts = await contactsBook.listContacts();
    res.status(200).json(listedContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
