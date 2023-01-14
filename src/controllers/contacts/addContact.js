const { Contact } = require("../../schemas/contact");
const { schemaRequired } = require("../../schemas/validation");

async function addContact(req, res, next) {
  const body = { favorite: false, ...req.body };

  const validationResult = schemaRequired.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const contact = await Contact.create(body);
  return res.status(201).json(contact);
}

module.exports = addContact;
