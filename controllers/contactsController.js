// const express = require("express")
// const {listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact} =require("../models/contacts");

const Contact = require("../models/contact");

const {ctrlWrapper} = require("../utils");

const getAll = async (_, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  
};

// const getById = async (req, res) => {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId);
//     if (!contact) {
//       res.status(404).json({ message: "Not found" });
//       return;
//     }
//     res.status(200).json(contact);

// };

// const add = async (req, res) => {
//     const { name, email, phone } = req.body;
//     const contact = await addContact({ name, email, phone });
//     res.status(201).json(contact);
// };

// const remove = async (req, res) => {
//     const { contactId } = req.params;
//     const isContactDeleted = await removeContact(contactId);
//     if (!isContactDeleted) {
//       res.status(404).json({ message: "Not found" });
//       return;
//     }
//     res.status(200).json({ message: "contact deleted" });
// };

// const update = async (req, res) => {
//     const { contactId } = req.params;
//     const newData = req.body;
//     const updatedContact = await updateContact(contactId, newData);
//     if (!updatedContact) {
//       res.status(400).json({ message: "Not found" });
//       return;
//     }
//     res.status(200).json(updatedContact);
// };

module.exports = {
  getAll:ctrlWrapper(getAll),
  // getById:ctrlWrapper( getById),
  // add:ctrlWrapper(add),
  // remove:ctrlWrapper(remove),
  // update:ctrlWrapper(update),
};