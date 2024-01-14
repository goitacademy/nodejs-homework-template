/* eslint-disable spaced-comment */
const express = require('express')

const fs = require("fs");
const path = require("path");
const router = express.Router()


// const contacts1 = require("../models/contacts.json")

const contactsPath = path.resolve("./models/contacts.json");
const data = fs.readFileSync(contactsPath);
const contacts = JSON.parse(data);


function listContacts() {
  try {
    return contacts;
} catch (err) {
  console.log(err.message);
  }
}

const getById = (contactId) => {
  return contacts.find((contact) => contact.id === contactId);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  // res.json(contacts1).status(200)
  listContacts();
  const contacts = listContacts();  
  res.send(contacts).status(200)
  // console.log(contacts)
  
})



router.get('/:contactId', async (req, res, next) => {
  const contact = getById(req.params.contactId);
  if (!contact) {
    return res.status(404).send({ message: "Not found" })
  }
  res.status(200).send(contact)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router