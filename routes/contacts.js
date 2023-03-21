const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require("../controllers/contacts");

const { userSchema } = require("../models/contacts.js");

const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res) => {
      try {
        const { contactId } = req.params;
        const user = getContactById(contactId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch {
        return res.status(500).send("Something went wrong");
    }
})

router.post('/', async (req, res) => {
     const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const { id, name, email, phone } = req.body;
        const user = addContact(id, name, email, phone);
        return res.status(201).json(user);
    } catch {
        return res.status(500).send("Something went wrong");
    }
});

router.delete('/:contactId', async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
  return res.status(400).send(error.details[0].message);
  }
  
  const contactId = req.params.contactId;
  try {
    const contactRemove = removeContact(contactId);
    if (contactRemove) {
      res.status(200).send("Contact was delete");
    } else {
      res.status(404).send("Not found");
    }
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  if (!contactId) {
    return res.status(400).send("Id is required to perform update")
  }

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const contact = getContactById(contactId);
  if (!contact) {
    return res.status(404).send("contact not found");
  }
  try {
    updateContact(contactId, req.body);
    return res.status(200).send("contact sucesfully update");
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;