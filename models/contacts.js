const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const Joi = require("joi");
const { HttpError } = require("../helpers");
const {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  changeContact,
} = require("./requests.js");

const contactsPath = path.join(__dirname, "contacts.json");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// const getAllContacts = async () => {
//   const data = await fs.readFile(contactsPath);

//   return JSON.parse(data);
// };

// const getById = async (id) => {
//   const contacts = await getAllContacts();
//   const result = contacts.find((contact) => contact.id === id);
//   return result || null;
// };

// const createContact = async (data) => {
//   const contacts = await getAllContacts();
//   const newContact = {
//     id: nanoid(),
//     ...data,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const deleteContact = async (id) => {
//   const contacts = await getAllContacts();
//   const index = contacts.findIndex((contact) => contact.id === id);
//   if (index === -1) return null;
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return result;
// };

// const changeContact = async (id, body) => {
//   const contacts = await getAllContacts();
//   const index = contacts.findIndex((contact) => contact.id === id);
//   if (index === -1) return null;
//   contacts[index] = { id, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//   return contacts[index];
// };

const listContacts = async (req, res, next) => {
  try {
    const allContacts = await getAllContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const contact = await getById(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const missingFieldName = error.details[0].path.toString();

      throw HttpError(400, `missing required ${missingFieldName} field`);
    }
    const contactToCreate = await createContact(req.body);
    res.status(201).json(contactToCreate);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToRemove = await deleteContact(id);

    if (!contactToRemove) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Contact removed successfully" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    const emptyBody = Object.keys(req.body);
    if (!emptyBody.length) {
      throw HttpError(400, `missing fields`);
    }
    if (error) {
      throw HttpError(
        400,
        `missing required ${error.details[0].path.toString()} field`
      );
    }

    const { id } = req.params;
    const updatedContact = await changeContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
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
