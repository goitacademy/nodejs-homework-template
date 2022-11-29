const express = require('express');
const {  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact
} = require('../../models/contacts')


const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, status: 200 })
})

// router.get('/', listContacts)

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ "message": "Not found", status: 404 });
    return;
  }
  res.status(200).json({ contact, status: 200 })
})

// router.get('/:contactId', getContactById)

router.post('/', async (req, res, next) => {

  const { name, email, phone } = req.body;
  
  if (!name) {
    res.status(400).json({ "message": "missing required 'Name' field", status: 400 });
    return;
  }
  if (!email) {
    res.status(400).json({ "message": "missing required 'Email' field", status: 400 });
    return;
  }
  if (!phone) {
    res.status(400).json({ "message": "missing required 'Phone' field", status: 400 });
    return;
  }
  
  const newContact = await addContact(req.body)
  res.status(201).json({ newContact, status: 201 })
})

// router.post('/', addContact)

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    res.status(404).json({ "message": "Not found", status: 404 });
    return;
  }
  res.status(200).json({ "message": "contact deleted", status: 200 })
})

// router.delete('/:contactId', removeContact)

// router.put('/:contactId', async (req, res, next) => {
  //   const { name, email, phone } = req.body;
  
  // if (!name && !email && !phone) {
  //   res.status(400).json({ "message": "missing fields", status: 400 });
  //   return;
  // }
//  const contact = await updateContact(req.paprams.contactId, req.body);
//  if(!contact) {
//    res.status(404).json("message": "Not found")
//    return
// }
//   res.status(200).json({ updatedContact, message: 'successfully updated' })
// })

// router.put('/:contactId', updateContact)

module.exports = router
