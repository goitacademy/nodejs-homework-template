const express = require('express')
const { listContacts, getContactById, addContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template mess' })
})

router.get('/list', async (req, res, next) => {
  const data = await listContacts() 
  res.json( {contacts: data} ) 
})

router.get('/api/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId) 
  console.log( await getContactById(req.params.contactId) ) 
  res.json( {contacts: data} )
})

router.post('/add/:name,:email,:phone', async (req, res, next) => {
  const body = req.params['name,:email,:phone']
  res.json({
    name: body[0],
    email: body[1],
    phone: body[2],
  })
  addContact(req.params['name,:email,:phone'])
})

// router.delete('/api/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/api/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
