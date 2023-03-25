const fs = require("fs").promises;
const path = require("node:path");

const { v4: uuidv4 } = require("uuid");
const { catchAsync } = require("../utils");

const contactsPath = path.join("models", "contacts.json");

exports.contactList = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result.toString());

    return contacts;
  } catch (error) {
    throw new Error("contacts is not available");
  }
};

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await exports.contactList();

  res.status(200).json({
    contacts,
  });
});

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contacts = await exports.contactList();

  const contactById = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  res.status(200).json({
    contactById,
  });
});

exports.removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contacts = await exports.contactList();

  const contactToDelete = contacts.find((contact) => contact.id === contactId);

  const newArray = contacts.filter(
    (contact) => contact.id !== contactToDelete.id
  );

  await fs.writeFile(contactsPath, JSON.stringify(newArray));
  res.sendStatus(204);
});

exports.addContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;

  const contacts = await exports.contactList();
  const newContact = { id: uuidv4(), name, email, phone };
  const newArray = [...contacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newArray));

  res.status(201).json({
    newContact,
  });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params.toString();

  const updatedContact = {
    contactId,
    name,
    email,
    phone,
  };

  const contacts = await exports.contactList();
  const filteredArray = contacts.filter((contact) => contact.id !== contactId);

  const newArray = [...filteredArray, updatedContact];

  await fs.writeFile(contactsPath, JSON.stringify(newArray));

  res.status(200).json({
    updatedContact,
  });
});
