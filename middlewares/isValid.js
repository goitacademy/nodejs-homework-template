// const express = require('express')
const fs = require('fs/promises')
const contactsDB = './controllers/contacts.json';

const isValidId = async (req, res, next) => {
    try {
    const { contactId } = req.params;
    const contacts = JSON.parse(
      await fs.readFile(contactsDB)
    );
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Contact does not exist...'
      });
      }
      req.contact = contact;
        next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = isValidId;
