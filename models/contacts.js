const fs = require("fs/promises");
const path = require("path");
const uuid = require('uuid').v4;

const contactsPath = path.resolve(__dirname, "contacts.json");

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { createUserDataValidator } = require('../utils/contactValidators');

const listContacts = catchAsync(async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

const getContactById = catchAsync(async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const contact = contacts.find((item) => item.id === contactId) || null;

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

const removeContact = catchAsync(async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const handleId = contacts.some((item) => item.id === contactId);

    if (!handleId) {
      res.status(404).json({ message: "Not found" });
    } else {
      const newContacts = contacts.filter((item) => item.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(newContacts));
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

const addContact = catchAsync(async (req, res, next) => {
  try {
    const { error, value } = createUserDataValidator(req.body);

    if (error) {
      return next(new AppError(400, { message: "missing required name field" }));
    } else {
      const contacts = JSON.parse(await fs.readFile(contactsPath));
      const newContact = {
        id: uuid(),
        ...value,
      };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      res.status(201).json(newContact);
    }
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

const updateContact = catchAsync(async (req, res, next) => {
  try {
    const { error, value } = createUserDataValidator(req.body);
    const { contactId } = req.params;

    if (error) {
      return next(new AppError(400, { message: "missing fields" }));
    } else {
      const contacts = JSON.parse(await fs.readFile(contactsPath));
      const index = contacts.findIndex((item) => item.id === contactId);

      if (index === -1) {
        res.status(404).json({ message: "Not found" });
      } else {
        contacts[index] = {
          id: contactId,
          ...value,
        };
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        res.status(200).json(contacts[index]);
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};