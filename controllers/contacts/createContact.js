const { Contact, validateContact } = require("../../models/contact-model");

// const { validateContact } = require("../../models/contact-model");

const createContact = async (req, res, next) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await Contact.create({
      ...req.body,
      owner: req.user.id,
    });
      
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = createContact;
