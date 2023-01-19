const ContactSchema = require("./schema");

const listContacts = async (req, res) => {
  const contacts = await ContactSchema.find();
  res.status(200).send(contacts);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await ContactSchema.findById(id);

  res.status(200).send(JSON.stringify(contact));
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const contact = await ContactSchema.findByIdAndRemove(id);
  res.status(200).send(JSON.stringify({ message: "Contact deleted" }));
};

const addContact = async (req, res) => {
  const newContact = new ContactSchema(req.body);
  await newContact.save();
  res.status(201).send(JSON.stringify(newContact));
};

const updateContact = async (req, res) => {
  const updateContact = await ContactSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).send(JSON.stringify(updateContact));
};

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  let { favorite } = req.body;
  const statusContact = await ContactSchema.findByIdAndUpdate(id, {
    $set: { favorite },
  });

  if (favorite === undefined) {
    res.status(400).send(JSON.stringify({ message: "missing field favorite" }));
  } else if (favorite === true || favorite === false) {
    return res.status(200).send(JSON.stringify(statusContact));
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
