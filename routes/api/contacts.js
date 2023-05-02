const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  listContacts().then(result=>{
    return res.status(200).send(result);
  });
  // res.json({ message: 'template getAll message' })
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId}=req.params;
  getContactById(contactId).then(result=>{
    if (!result) return res.status(404).send({message:"Contact with this id was not found"})
    return res.status(200).send(result);
  });
})

router.post('/', async (req, res, next) => {
  const {name,email,phone}=req.body;
  if (!name || !email || !phone) return res.status(400).send({"message": "missing required name field"});
  const newContact=await addContact({name,email,phone});
  return res.status(200).send(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId}=req.params;
  removeContact(contactId).then(result=>{
    if (!result) return res.status(404).send({"message": "Contact with this id was not found"});
    return res.status(200).send({"message": "contact deleted"});
  });
})

router.put('/:contactId', async (req, res, next) => {
  const {contactId}=req.params;
  const {name,email,phone}=req.body;
  const newBody={};  if (name) newBody.name=name;  if (email) newBody.email=email;  if (phone) newBody.phone=phone;
  if (Object.keys(newBody).length===0) return res.json({ message: 'missing any of required name fields' })
  
  updateContact(contactId,newBody).then(result=>{
    if (!result) return res.status(404).send({"message": "Contact with this id was not found"});
    return res.status(200).send(result);
  });
})

module.exports = router