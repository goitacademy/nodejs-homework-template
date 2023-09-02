const contactsBook = require("../../models/contacts.js");

const add = async (req, res, next) => {
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      owner: req.user.id,
    };
    const result = await contactsBook.create(newContact);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
