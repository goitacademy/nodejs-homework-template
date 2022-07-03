const Contact = require("../../models/contactSchema");

const getAllContact = async (req, res, next) => {
  try {
    res.json(await Contact.find());
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContact;
