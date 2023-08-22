const Contact = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;