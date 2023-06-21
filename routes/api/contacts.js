const express = require('express')
const router = express.Router()

const {
  Contact,
  updateStatusContact
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const contacts = await Contact.find(); 
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts: contacts
    },
  })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await Contact.findOne({ _id: req.params.contactId })
  if(contact) {
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact: contact
      }
    })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/', async (req, res, next) => {
  const newContact = await Contact.create(req.body)
  if(newContact){
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact: newContact
      }
    })
  } else {
    res.status(400).json({ message: "Missing required name - field" })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await Contact.deleteOne({ _id: req.params.contactId })
  if(contact){
    res.status(200).json({ message: 'Contact deleted' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const updatedContact = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body , { new: true })

  if(updatedContact){
    res.status(200).json(updatedContact)
  }
  else{
    res.status(404).json({ message: 'Not Found' })
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  const contact = await updateStatusContact({ _id: req.params.contactId }, req.body)

  const data = await updateStatusContact({ _id: req.params.contactId }, req.body)
  const params = await updateStatusContact({ _id: req.params.contactId })
  const body = await updateStatusContact(req.body)

  if(contact){
    res.status(200).json(contact)
  }
  else if(params && !body) {
    res.status(400).json({ "message": "missing field favorite" })
  }
  else if(!data){
    res.status(404).json({ message: "Not found" })
  }
})

module.exports = router
