// const fs = require('fs/promises')
// const path = require('path');
// const { v4 } = require('uuid');

// const { connectMongo } = require('../db/connection');


const Joi = require("joi");

const contactsJoiSchema = Joi.object({
name: Joi.string().required(),
email: Joi.string().email().required(),
phone: Joi.string()
.regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
.required(),
});

// const contactsPath = path.resolve(__dirname, "contacts.json");

const ObjectId = require('mongodb').ObjectId;

const listContacts = async (req, res) => {
  const contacts = await req.db.Contacts.find({}).toArray();
  res.json({contacts})
};



const getContactById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await req.db.Contacts.findOne({_id: new ObjectId(contactId)});
  
  if (!contact) {
    return res.status(400).json({
      status: 'failure, no contacts found!', 
    });
}
  
  res.json({ contact, status: 'success' });
};


const removeContact = async (req, res) => {

  const {contactId} = req.params;
  await req.db.Contacts.deleteOne({ _id: new ObjectId(contactId) });
  
  res.json({status: 'success'})
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



const addContact = async (req, res) => {
  const { error } = contactsJoiSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
    
  const { name, email, phone } = req.body;
  await req.db.Contacts.insert({ name, email, phone });
  res.json({ status: 'success' });
};



const updateContact = async (req, res) => {
  //   if (!req.body) {
  //     const error = new Error('missing fields');
  //     error.status = 400;
  //     throw error;
  //   }
    
    const { error } = contactsJoiSchema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  await req.db.Contacts.updateOne(
    { _id: new ObjectId(contactId) },
    { $set: { name, email, phone } }
  );
  res.json({ status: 'success' });
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
