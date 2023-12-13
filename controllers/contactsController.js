const fs = require("fs").promises;
const uuid = require("uuid").v4;
const path = require("path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const { catchAsync, HttpError, contactsValidation } = require("../units");

exports.getAllContacts = catchAsync(async (req, res) => {
  const contactsDB = await fs.readFile(contactsPath);

  const contacts = JSON.parse(contactsDB);

  res.status(200).json(contacts);
});

exports.createContact = catchAsync(async (req, res) => {
  // const { value, error } = contactsValidation.checkContact(req.body);
  // if (error) {
  //   throw new HttpError(400, "missing required name field");
  // }
  // const { name, email, phone } = value;
  const newContact = {
    id: uuid(),
    ...req.body,
  };

  const contactsDB = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsDB);
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  res.status(201).json(newContact);
});

exports.getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contactsDB = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(contactsDB);

  const result = allContacts.find((contact) => contact.id === contactId);

  if (!result) {
    throw new HttpError(404, "Not Found");
  }

  res.status(200).json(result);
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contactsDB = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(contactsDB);

  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    throw Error(404, "Not found");
  }

  const deletedContact = allContacts.splice(contactIndex, 1)[0];

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  res.status(200).json(deletedContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  
   if (!name && !email && !phone) {
     return res.status(400).json({ message: "missing fields" });
   }

  const contactsDB = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(contactsDB);

  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    throw Error(404, "Not found");
  }
  allContacts[contactIndex] = { ...allContacts[contactIndex], ...req.body };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  res.status(200).json(allContacts[contactIndex]);
});
