const { HttpError } = require("../helpers");

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { id: owner } = req.user;

  const contact = new Contact({ name, email, phone, favorite, owner });

  try {
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
