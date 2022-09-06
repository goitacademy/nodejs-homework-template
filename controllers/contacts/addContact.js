// const { basedir } = global;
const { Contact, schemas } = require("../../models/contacts");

const addContact = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
