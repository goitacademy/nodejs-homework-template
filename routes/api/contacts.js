
const express = require('express')
const {authenticate} = require('../../middleware/authenticate')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");


const uniqid = require('uniqid'); 
const schemaJoi = require('./schema');
const router = express.Router()



router.get('/', authenticate, async (res, req) => {
  try {
    const contacts = await listContacts(req);
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    
  }
  
});

router.get('/:contactId',authenticate, async (req, res, next) => {
  try{
  const contact = await getContactById(req.params.contactId)
  res.status(200).json(contact)}
  catch (err) {
  res.status(404).json({ message: "Contact not found" })
  }
});

router.post('/', authenticate, async (req, res, next) => {
 try{
  const {name, email, phone} = req.body;
  if(!name||!email|| !phone) {
    throw new Error ("missing required name field");
  }
const result = schemaJoi.validate({name, email, phone});
if (result.error) {
  throw new Error(`${result.error.message}`);
} else {
  console.log("Phone number is valid");
}
const id = uniqid.time();
    const newContact = { id, name, email, phone };
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
 }
})

router.delete("/:contactId", authenticate, async (req, res, next) => {
  
  try {
    const newArr = await removeContact(req.params.contactId);
    console.log(newArr);
    res.status(200).json({message: "contact deleted"});
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put('/:contactId', authenticate, async (req, res, next) => {
  try {
    if(Object.keys(req.body).length ===0)
    return res.status(400).json({ message: "missing fields" });
    const result = schemaJoi.validate({...req.body});
    if (result.error) {
      throw new Error (`${result.error.message}`);}
      else {
        console.log("Phone number is valid");
      }
      const updatedContact = await updateContact(req.params.contactId, req.body);
      res.status(200).json(updatedContact)
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.patch('/api/contacts/:contactId/favorite', authenticate, async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  try {
    const updatedContact = await updateStatusContact(contactId, body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Контакт не найден" });
  }
});

module.exports = router
