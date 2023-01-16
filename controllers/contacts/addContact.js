const { contactAddSchema } = require("../../utils/validation");
const { HttpError } = require("../../utils/httpError");
const { Contact } = require("../../models/model");

async function addContact(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing required name field"));
    }

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required name field" });
    }

    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = addContact;
