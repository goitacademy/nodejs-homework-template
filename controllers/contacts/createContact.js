const { Contact, schemas } = require("../../models");

const addContact = async (name, email, phone) => {
  const newContact = {
    name,
    email,
    phone,
  };
  const newUser = await Contact.create(newContact);
  return newUser;
};

const createContact = async (req, res) => {
  const validationDataReq = schemas.contactsSchema.validate(req.body);
  const {
    value: { name, email, phone },
  } = validationDataReq;

  if (!name || !email || !phone) {
    const [errorLable] = validationDataReq.error.details;
    res.status(400).json({
      message: `missing required ${errorLable.context.label} field`,
    });
    return;
  }

  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
};

module.exports = createContact;
