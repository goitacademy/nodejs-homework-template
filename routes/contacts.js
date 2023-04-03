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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).send("Contacts not found");
    }
    return res.status(200).json(contact);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post('/', async (req, res) => {
     const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
  try {
    const { name, email, phone } = req.body;
    const user = await addContact({name, email, phone});
       
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
});


router.delete('/:contactId', async (req, res) => {

  const {contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  try {
    removeContact(contactId);
    return res.status(204).send();
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
    const { name, email, phone } = req.body;

  if (!contactId) {
    return res.status(400).send("Id is required to perform update")
  }

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const contact = await getContactById(contactId);
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