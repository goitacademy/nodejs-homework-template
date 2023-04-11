const { addContact } = require("../models/contacts");
const { schema } = require("../schemas/validator");
const nanoid = require("nanoid");

const createContact = async (req, res, next) => {
  const { error, value } = schema(req.body);
  const validationDataReq = schema(req.body);
  if (validationDataReq.error) {
    const [errorLable] = validationDataReq.error.details;
    res.status(400).json({
      message: `missing required ${errorLable.context.label} field`,
    });
    return;
  }

  const { name, email, phone } = value;
  const newContact = { id: nanoid(), name, email, phone };
  const data = await addContact(newContact);
  res.status(201).json(data);
};

module.exports = createContact;
