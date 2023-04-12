// const express = require("express")
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} =require("../../../models/contacts");

// const {contactValidation,putContactValidation} = require ("../../../validationSchema/validation")


const getAll = async (_, res) => {
  try{
    const contacts = await listContacts();
    res.status(200).json(contacts);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
  
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const add = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await addContact({ name, email, phone });
    // if (!contact) {
    //   res.status(400).json({ message: "missing + req.params + required field" });
    //   return;
    // }
    res.status(201).json({contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isContactDeleted = await removeContact(contactId);
    if (!isContactDeleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const newData = req.body;
    const updatedContact = await updateContact(contactId, newData);

    if (!updatedContact) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    res.status(200).json({contact: updatedContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {getAll,getById,add,remove,update };