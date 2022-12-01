// const fs = require("fs/promises");
// const path = require("node:path");
// const { v4: uuidv4 } = require("uuid");
// import { nanoid } from 'nanoid'
const Contact = require("../services/schema");

// const contactsPath = path.join(__dirname, "./contacts.json");
// const contactsList = fs.readFile();

const listContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find({});
    return res.json({ data: contacts, status: 200 });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contactById = await Contact.findById({ _id: id });
    if (contactById) {
      return res.json({ data: contactById, status: 200 });
    } else {
      return res.status(404).json({
        data: `Contact with id ${id}, was not found`,
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const responce = await Contact.findOneAndRemove({ _id: id });
    if (responce) {
      return res.json({ data: responce, status: 200 });
    } else {
      return res.status(404).json({
        data: `Contact with id ${id}, was not found`,
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const responce = await Contact.create({ name, email, phone });
    return res.json({ data: responce, status: 201 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const responce = await Contact.findOneAndUpdate(
      { _id: id },
      { name, email, phone }
    );
    if (responce) {
      return res.json({ data: responce, status: 200 });
    } else {
      return res.status(404).json({
        data: `Contact with id ${id}, was not found`,
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
