const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  listContacts();
  res.json({ message: 'template getAll message' })
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId}=req.params;
  getContactById(contactId);
  res.json({ message: 'template getOne message' })
})

router.post('/', async (req, res, next) => {
  const {name,email,phone}=req.body;
  if (!name || !email || !phone) return res.json({ message: 'template denied message' });
  addContact({name,email,phone});
  res.json({ message: 'template post message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId}=req.params;
  removeContact(contactId);
  res.json({ message: 'template delete message' })
})

router.put('/:contactId', async (req, res, next) => {
  const {contactId}=req.params;
  const {name,email,phone}=req.body;
  let newBody={};
  if (name) newBody.name=name;
  if (email) newBody.email=email;
  if (phone) newBody.phone=phone;
  if (Object.keys(newBody).length===0) return res.json({ message: 'template edit denied message' })
  updateContact(contactId,newBody);
  res.json({ message: 'template edit message' })
})

module.exports = router