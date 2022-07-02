const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

module.exports = getAll;
