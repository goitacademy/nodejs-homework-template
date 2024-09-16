const express = require('express')
const router = express.Router()
const Joi = require('joi')
const contactsModel = require('./../../models/contacts')



const contactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
})



// GET api/contacts
router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.status(200).json(contacts);
  // res.json({ message: 'template message' })
})



// GET api/contacts/:id
router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.id;
  const contact = await contactsModel.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json(contact);
  // res.json({ message: 'template message' })
})



// POST api/contact
router.post('/', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `Missing required ${error.details[0].context.key}` });
  }
  // const newContact = await contactsModel.addContact(req.body);
  // res.status(201).json(newContact);
  // // res.json({ message: 'template message' })
})



//DELETE api/contact/:id
router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.id;
  const contact = await contactsModel.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await contactsModel.removeContact(contactId);
  res.status(200).json({ message: 'Contact deleted' });
  // res.json({ message: 'template message' })
})



//PUT api/contact/::id
router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.id;
  const contact = await contactsModel.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const updatedContact = await contactsModel.updateContact(contactId, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(updatedContact);
  // res.json({ message: 'template message' })
})

module.exports = router
