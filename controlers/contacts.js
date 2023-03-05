// const fs = require("fs/promises");
// const path = require("path");
// const uniqid = require("uniqid");

// const contactsPath = path.join(__dirname, "contacts.json");

// // TODO: задокументировать каждую функцию
// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (id) => {
//   const contactId = String(id);
//   const books = await listContacts();
//   const result = books.find((item) => item.id === contactId);
//   return result || null;
// };

// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// const addContact = async (data) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: uniqid(),
//     ...data,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateById = async (id, data) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateById,
// };

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const HttpError = require("../helpers/HttpError");

const Contact = require("../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    console.log(result);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ massage: "Server error" });
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    console.log(req.body);
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// const deleteContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const deleteContact = await contacts.removeContact(contactId);
//     if (!deleteContact) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({ message: "Contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

const changeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const newContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!newContact) {
      throw HttpError(404, "Not found");
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAll,
  getById,
  add,
  // deleteContact,
  changeContact,
};
