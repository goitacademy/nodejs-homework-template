const uuid = require("uuid").v4;
const Contact = require("../models/contactsModel");
const { catchAsync } =require("../helpers/catchAsync");

const getlistContacts = async (req, res, next) => {
  const users = await Contact.find();
  res.status(200).json(users);
};

const getContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    res.status(200).json(contact);
});

const createContact = catchAsync(async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await Contact.create({
    id: uuid(),
    name,
    email,
    phone,
    favorite: favorite || false,
  });

  res.status(201).json(newContact);
});

const deleteContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId);

  res.status(204).json({ message: "Contact deleted" });
});

const changeContact = catchAsync(async (req, res, next) => {
  const { phone, name, mail } = req.body;
  const { contactId } = req.params;
  if (!phone && !name && !mail) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { phone, name, mail },
    { new: true }
  );

  res.status(200).json(updatedContact);
});

const updateStatusContact = catchAsync(async (req, res, next) => {
  if (!('favorite' in req.body)){
   res.status(400).json({ message: "missing field favorite" });
   return;
  }
  const { favorite } = req.body;
  const { contactId } = req.params;
console.log(contactId)
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  res.status(200).json(updatedContact);
});

module.exports = {
  getlistContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
  updateStatusContact,
};
