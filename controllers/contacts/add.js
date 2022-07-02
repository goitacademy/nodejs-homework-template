const { Contact } = require("../../models/contacts");

const add = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

module.exports = add;
