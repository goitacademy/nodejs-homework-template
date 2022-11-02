const express = require('express')

const router = express.Router()

const { listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact } = require("../../models/contacts.js")

const {validationBody} = require ("../../middlewares/validationBody.js")
const { schemaPostContact,
schemaPutContact} = require("../../schema/validationSchema")  

router.get('/', async (req, res, next) => {
   const contacts = await listContacts();
  res.status(200).json({ contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact === null) {
   return res.status(404).json({
      message: "Not found"
   })
  }
  res.status(200).json({ contact });
});

router.post('/', validationBody(schemaPostContact), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const nemContact = await addContact(name, email, phone);
  res.status(201).json({ nemContact })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact === null) {
   return res.status(404).json({
      message: "Not found"
   })
  }
  res.status(200).json({ message: "contact deleted" });
})

router.put('/:contactId', validationBody(schemaPutContact), async (req, res, next) => {
  const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, { name, email, phone });
    res.status(200).json({ updatedContact });
  })

module.exports = router