const express = require('express')
const contactsFun = require('../../models/contacts')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contactsFun.listContacts()
  res.status(200).json(result)
})
router.get('/:contactId', async ({params}, res, next) => {
  const result = await contactsFun.getContactById(params.contactId)
  res.status(200).json(result)
})

router.post('/', async (req, res, next) => {
  const result = await contactsFun.addContact(req)
  res.status(201).json(result)
})

router.delete('/:contactId', async ({params}, res, next) => {
  const result = await contactsFun.removeContact(params.contactId)
  if(result[0].id){
    res.status(200).json({ message: 'contact deleted' })
  }
  else{res.status(404).json({ message: 'Not found' })}
})

router.put('/:contactId', async (req, res, next) => {
  const result = await contactsFun.updateContact(req.params.contactId, req.body)
  res.status(200).json(result)
})

module.exports = router
