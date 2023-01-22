const Contacts = require("../../models/contacts");

// create new contact
const createNewContact = async (req, res, next) => {
  try {
    const user = req.user;

    const newContact = await Contacts.create({ ...req.body, owner: user._id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = createNewContact;
