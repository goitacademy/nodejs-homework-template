const express = require('express')
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("./models/contacts");

router.get('/', async (req, res, next) => {
  try {
    const contacts = listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.id;
  try {
    const contact = getContactById(id);
    if (id) {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


  const newContact = {
    id: uuidv4,
    name,
    email,
    phone,
  };

  const addedContact = addContact(newContact);

  res.status(201).json(addedContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.id;

  const removedContact = removeContact(id);

  if (removedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const updatedContact = updateContact(id, { name, email, phone } );
  if(updatedContact){
    res.status(200).json(updatedContact);
  }else{
    res.status(404).json({message: "Not found"})
  }

})

module.exports = router
