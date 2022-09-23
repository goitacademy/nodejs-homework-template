// const fs = require('fs/promises');
let contacts = require('../models/contacts.json');
const { v4 } = require('uuid');

const listContacts = async (req, res, next) => {
  return res.json({
    status: "success",
    code: 200,
    result: contacts,
  })
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
            }) 
  } else {
    return res.json({
            status: "success",
            code: 200,
            result: contact,
            })
  }
  
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  
  if (contactId) {
    contacts = contacts.filter(contact => contact.id !== contactId);
    return res.json({
            status: "success",
            code: 200,
            message: "Contact deleted",
            })
  } else {
    return res.json({
            status: "error",
            code: 404,
            message: "Not found",
            })
  }
  
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
        name,
        email,
        phone,
        id: v4(),
        }

  contacts.push(newContact);
  
  return  res.json({
            status: "success",
            code: 201,
            result: newContact,
          })
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!contactId) {
    return res.json({
            status: "error",
            code: 404,
            message: "Not found",
            })
  } else {
      contacts.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      
        return res.status(200).json({
                status: "success",
                code: 200,
                result: contact,
              })
      }
    })
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
