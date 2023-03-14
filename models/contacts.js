// const fs = require('fs/promises')
// const path = require('path');
// const { v4 } = require('uuid');

const { connectMongo } = require('../db/connection');


// const Joi = require("joi");

// const contactsJoiSchema = Joi.object({
// name: Joi.string().required(),
// email: Joi.string().email().required(),
// phone: Joi.string()
// .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
// .required(),
// });

// const contactsPath = path.resolve(__dirname, "contacts.json");



const listContacts = async (req, res) => {
  const { collection } =  await connectMongo();
  const contacts = await collection.find({}).toArray();
  res.json({contacts})
};



const getContactById = async (req, res, next) => {
  // try {
  //   const { contactId } = req.params;
  //   const data = await fs.readFile(contactsPath);
  //   const contacts = JSON.parse(data);
  //   const result = contacts.find(item => item.id === contactId);
  //   if (!result) {
  //     const error = new Error("Not found");
  //     error.status = 404;
  //     throw error;
  //   }
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: { result },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};


const removeContact = async (req, res, next) => {
  // try {
  //   const { contactId } = req.params;
  //   const data = await fs.readFile(contactsPath);
  //   const contacts = JSON.parse(data);
  //   const removedContact = contacts.find(item => item.id === contactId);
  //   if (!removedContact) {
  //     const error = new Error("Not found");
  //     error.status = 404;
  //     throw error;
  //   }

  //   const newContactList = contacts.filter(item => item.id !== contactId);
  //   fs.writeFile(contactsPath, JSON.stringify(newContactList));
    
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     message: "contact deleted",
  //     data: { newContactList },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};



const addContact = async (req, res, next) => {
  // try {
  //   const { error } = contactsJoiSchema.validate(req.body);
  //   if (error) {
  //     error.message = "missing required name field";
  //     error.status = 400;
  //     throw error;
  //   }
    
  //   const { name, email, phone } = req.body;
  //   const data = await fs.readFile(contactsPath);
  //   const contacts = JSON.parse(data);
  //   const newContacts = { id: v4(), name, email, phone };
    
  //   contacts.push(newContacts);
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts));
    
  //   res.status(201).json({
  //     status: "success",
  //     code: 201,
  //     data: { newContacts },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};



const updateContact = async (req, res, next) => {
  // try {
  //   if (!req.body) {
  //     const error = new Error('missing fields');
  //     error.status = 400;
  //     throw error;
  //   }
    
  //   const { error } = contactsJoiSchema.validate(req.body);
  //   if (error) {
  //     error.message = "missing required name field";
  //     error.status = 400;
  //     throw error;
  //   }
  //   const { contactId } = req.params;
  //   const { name, email, phone } = req.body;
  //   const data = await fs.readFile(contactsPath);
  //   const contacts = JSON.parse(data);
    
  //   const contact = contacts.find(item => item.id === contactId);
    
  //   if (!contact) {
  //     const error = new Error('Not found');
  //     error.status = 404;
  //     throw error;
  //   }
    
  //   contact.name = name;
  //   contact.email = email;
  //   contact.phone = phone;
    
  //   const contactIdx = contacts.findIndex(item => item.id === contactId);
  //   contacts[contactIdx] = contact;
    
  //   fs.writeFile(contactsPath, JSON.stringify(contacts));
    
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       contact,
  //     },
  //   });
  // } catch (error) {
  //   next(error)
  // }
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
