const Contact = require("../models/contactModel");

exports.getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

exports.getContactById = async ({ params }, res) => {
  const { contactId } = params;
  const contact = await Contact.findById(contactId);
  res.status(200).json(contact);
};

exports.createContact = async ({ body }, res, next) => {
  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
};

exports.deleteContactById = async ({ params }, res, next) => {
  const { contactId } = params;
  await Contact.findByIdAndDelete(contactId);
  res.status(200).json({ message: "contact deleted" });
};

exports.changeContact = async ({ body, params }, res, next) => {
  const { contactId } = params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  res.status(200).json(updatedContact);
};

exports.updateStatusContact = async ({ body, params }, res, next) => {
  const { contactId } = params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  res.status(200).json(updatedContact);
};
