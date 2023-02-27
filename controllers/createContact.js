const { addContact } = require("../models/contacts");
const { schema } = require("../schema/joiSchema");
const { Contact } = require("../db/collections");

const createContact = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: "Missing required name field" });
    }

    const contact = req.body;
    const newContact = await addContact(contact);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = {
  createContact,
};
