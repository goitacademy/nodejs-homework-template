const express = require("express");
const Joi = require("joi");

const postSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).required(),
})

const putSchema = Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().email(),
    phone: Joi.string().min(8),
})

const router = express.Router()
const { listContacts, 
        getContactById, 
        addContact, 
        removeContact, 
        updateContact, 
      } = require("../../models/contacts");

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contactById);
  }
})

router.post('/', async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if ( error ) {
      res.status(400).json({ message: "missing required name - field"});
      return;
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
})

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if(deletedContact) {
    res.status(200).json({ message: "Contact deleted"});
  } else {
    res.status(404).json({ message: "Not found"});
  }
})

router.put('/:contactId', async (req, res) => {
    try {
        const { error } = putSchema.validate(req.body);
        if (error) {
          res.status(400).json({ message: "missing fields" });
          return;
        }
        const changedContact = await updateContact(req.params.id, req.body);
        if (changedContact) {
        res.status(200).json(updateContact);
        } else {
        res.status(404).json({ message: "Not found"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

module.exports = router;