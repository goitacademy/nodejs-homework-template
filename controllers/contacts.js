const fs = require('fs/promises');
const { contactsValiadation, contactsValiadationFavorite } = require('../valiadators/joiValiadator');
const Contact = require('../models/contacts');
const mongoose = require('mongoose');


const listContacts = async (req, res) => {
      try {
        const contactsList = await Contact.find();
        return res.status(200).json(contactsList);   
    } catch (err) {
        res.sendStatus(500);
    }
}

const getContactById = async (req, res) => {

  try {
    const { id } = req.params;
    console.log(id);
    const item = await Contact.findById(id);
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json(item);
    } catch (err) {
    res.status(400).json({ message: 'Ooops...'})
    }
}

const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Contact.findByIdAndRemove(id);
    const contactsList = await Contact.find();
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json({ "message": "contact deleted", contactsList });
    } catch (err) {
        res.status(400).json({ message: 'Ooops...'})
    }
}

const addContact = async (req, res) => {  
  try {
    const { error, value } = contactsValiadation(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
    const item = await Contact.create({name: req.body.name, email: req.body.email, phone: req.body.phone, favorite: req.body.favorite});
    return res.status(201).json({ message: 'Contact is added', Contact });
  }
  catch (err) {
        res.status(405).json({ message: 'Ooops...'})
    }
}

const updateContact = async (req, res) => {
  try {
    const { error, value } = contactsValiadation(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
    const item = await Contact.findOneAndUpdate({name: req.body.name, email: req.body.email, phone: req.body.phone, favorite: req.body.favorite });
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(201).json({ message: 'Contact is updated', item });
  }
  catch (err) {
    res.status(400).json({ message: 'Ooops...',})
  }
}
const updateStatusContact = async (req, res) => {
  try {
    const { error, value } = contactsValiadationFavorite(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
    const item = await Contact.findOneAndUpdate({favorite: req.body.favorite });
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(201).json({ message: 'Contact is updated', item });
  }
  catch (err) {
    res.status(400).json({ message: 'Ooops...',})
  }
}
  
  
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}