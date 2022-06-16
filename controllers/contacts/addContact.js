const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await Contact.create({
      ...req.body,
      owner: _id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
