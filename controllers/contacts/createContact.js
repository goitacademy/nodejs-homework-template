const { addContact } = require("../../service/contacts");
const { addContactSchema } = require("../../middlewares/joiValidate");

const createContact = async (req, res) => {
  const { error, value } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, email, phone, favorite } = value;
  const contact = { name, email, phone, favorite };
  const data = await addContact(contact);
  res.status(201).json(data);
};

module.exports = createContact;
