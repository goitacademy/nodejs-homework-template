const Contact = require("../models/contact");
const HttpError = require("../helpers/HttpError");


const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const owner = req.user.id; 

  const contact = new Contact({ name, email, phone, favorite, owner });

  try {
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;