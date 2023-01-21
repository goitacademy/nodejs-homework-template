const { Contact } = require("../../schemas/contact");
const { schemaRequired } = require("../../schemas/validation");

async function addContact(req, res, next) {
  const body = { favorite: false, ...req.body, owner: req.user.id };

  const validationResult = schemaRequired.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newContact = await Contact.create(body);
  const contact = await Contact.findById(newContact.id).select({
    __v: 0,
    owner: 0,
  });
  return res.status(201).json(contact);
}

module.exports = addContact;
