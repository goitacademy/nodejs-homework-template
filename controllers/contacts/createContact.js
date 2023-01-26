const { Contacts } = require("../../models/contact.js");
const { RequestError } = require("../../helpers/index.js");
const { contactSchema } = require("../../schemas/validationSchemaContact.js");

// POST / api / contacts

async function createContact(req, res, next) {
  try {
    const validationResult = contactSchema.validate(req.body);
    const { name, email, phone, favorite } = req.body;
    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }
    const newContact = await Contacts.create({ name, email, phone, favorite });
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

module.exports = createContact;
