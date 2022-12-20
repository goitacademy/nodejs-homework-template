
const contactsOperations = require("../../models/contactsOperations");
const getError = require("../../routes/error/error");

const uuid = require("uuid");
const contactSchema = require("../../schemas")

const add = async (req, res) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw getError(400, "missing required name field");
    } else {
      const contactWithId = await { id: uuid.v4(), ...req.body };
      const postedContact = await contactsOperations.addContact(contactWithId);
      res.status(201).json(postedContact);
    }
}

module.exports = add