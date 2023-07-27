const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join(__dirname, "contacts.json");
const { AppError, catchAsync, contactsValidators } = require("../utils");

const checkContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 10) {
    throw new AppError(400, "Invalid ID..");
  }

  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const contact = contacts.find((item) => item.id === id);

  if (!contact) throw new AppError(404, "Not found");

  req.contact = contact;
  next();
});

const listContacts = catchAsync(async (req, res, next) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

const getContactById = (req, res, next) => {
  const { contact } = req;

  res.status(200).json({
    msg: "Success",
    contact,
  });
};

const removeContact = catchAsync(async (req, res, next) => {
  const { contact } = req;

  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const newContactsList = contacts.filter((item) => item.id !== contact.id);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));

  res.status(200).json({
    msg: "contact deleted",
  });
});

const addContact = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );
  const { name, email, phone } = value;

  if (error) throw new AppError(400, "missing required name field");

  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  const contacts = JSON.parse(await fs.readFile(contactsPath));
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  res.status(201).json({
    msg: "Success",
    contact: newContact,
  });
});

const updateContact = catchAsync(async (req, res, next) => {
  const { contact } = req;
  const { error, value } = contactsValidators.updateContactDataValidator(
    req.body
  );
  const { name, email, phone } = value;

  if (error) throw new AppError(400, "missing fields");

  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const index = contacts.findIndex((item) => item.id === contact.id);
  contacts[index] = { ...contact, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  res.status(200).json({
    msg: "Success",
    contact: contacts[index],
  });
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  checkContact,
};
