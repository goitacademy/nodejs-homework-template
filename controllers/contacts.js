const Joi = require("joi");

const contacts = require("../models/contacts.js");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require ("../helpers/ctrlWrapper.js")


// ======= Pattern for validation   for Post(add new Contact) and Put (Update Contact)
const schemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaPut = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

// ======= Get All Contqcts ========================

async function getAllContacts(req, res) {
      const result = await contacts.listContacts();
       res.json(result);
}

// =======Get Contacts by Id =====================

async function getContactById (req, res) {
    const { contactId } = req.params;
    const result = await contacts.getById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found")
    }
    res.json(result);
}

// ========= Add  Contact =======================

async function addContact(req, res) {
   const { error } = schemaPost.validate(req.body);
   if (error) {
     throw HttpError(400, error.message);
   }
   const result = await contacts.addContact(req.body);
   res.status(201).json(result);
};

// ========= Delete contact ======================

async function removeContact (req, res)  {
 
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact was deleted successfully" });
};

// ======== Update Contact ========================
async function updateContact (req, res) {
    const { name, email, phone } = req.body;
    const { error } = schemaPut.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;

    if (!name && !email && !phone) {
      res.status(400).json({ message: '"message": "missing fields"' });
    }

    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
 
};