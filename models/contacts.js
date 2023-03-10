const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const Joi = require("joi");

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
});

const contactsPath = path.resolve(__dirname, './contacts.json');




const listContacts = async (req, res, next) => {
  try {
const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);

    res.status(200).json({
      contacts,
    });
  } catch (error) {
next(error)
  }
};



const getContactById = async (req, res, next) => {
  try {
const { contactId  } = req.params;

const contacts = await listContacts();
const result = contacts.find(item => item.id === contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
}
    res.status(200).json({
      result,
    });
  } catch (error) {
next(error)
  }
};


const removeContact = async (req, res) => {
  try {
const { contactId } = req.params;

const contacts = await listContacts();
const newContactList = contacts.filter(item => item.id !== contactId); 
    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    console.log(contacts);
    console.log(newContactList);
    
    res.status(200).json({
      msg: "contact deleted"
    });
  } catch (err) {
    res.status(404).json({
      msg: "Not found",
    });
  }
};



const addContact = async (req, res, next) => {
  try {
const { error } = contactsJoiSchema.validate(req.body);
if (error) {
error.message = "missing required name field";
error.status = 400;
throw error;
}
    
const { name, email, phone } = req.body;
const contacts = await listContacts();
const newContacts = { id: v4(), name, email, phone};

contacts.push(newContacts);

await fs.writeFile(contactsPath, JSON.stringify(contacts));

res.status(201).json({
      contact: newContacts,
    });
  } catch (error) {
next(error)
  }
};



const updateContact = async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error('missing fields');
      error.status = 400;
      throw error;
    }
    
    const {error}  = contactsJoiSchema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contacts = await listContacts();

  const contact = contacts.find(item => item.id === contactId); 

  if (name) contact.name = name;
  if (email) contact.email = email;
  if (phone) contact.phone = phone;

  const contactIdx = contacts.findIndex(item => item.id === contactId);
  contacts[contactIdx] = contact;

fs.writeFile(contactsPath, JSON.stringify(contacts));
    if (!contact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
}
    
    res.status(200).json({
      contact,
    });
  } catch (error) {
next(error)
  }
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
