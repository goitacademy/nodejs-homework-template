const contacts = require("../models/contacts");
const contactAddSchema = require("../schema/addSchema");

const addContact = async(req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

module.exports = addContact;