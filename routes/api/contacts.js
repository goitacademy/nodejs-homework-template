const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const contactList = require('../../model/index')
const bodyJSON = express.json()

router.get('/', async (req, res, next) => {
  const contact = await contactList.listContacts()
  res.json({ 
    status: 200,
    message: 'template message',
    data: contact
  })
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  const contact = await contactList.getContactById(contactId)
  contact ? 
  res.json({
    status: 200,
    message: 'Contact id',
    data: contact
  }) :
  res.json({ 
    status: 404,
    message: 'Not found' 
  })
})

router.post('/', bodyJSON, async (req, res, next) => {
  const newStr = {id: uuidv4(), ...req.body}
  const {name, email, phone} = newStr
  let param
  switch(true){
    case !name && !email && !phone:
      param = 'all'
      break
      case !name && !phone:
        param = 'name, phone'
      break
      case !name && !email:
        param = 'name, email'
      break
      case !phone && !email:
        param = 'phone, email'
      break
      case !phone:
        param = 'phone'
      break
      case !email:
        param = 'email'
      break
      case !name:
        param = 'name'
      break
      default:
        param = 'some'
  }
  const newContact = await contactList.addContact(newStr)
  name && email && phone ?  
  res.json({
    status: 201,
    message: 'Contact add',
    data: newContact
   }):
   res.json({
     status: 400,
     message: `missing required name field`
   })
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  const index = await contactList.removeContact(contactId)
  console.log(index)
  index !== -1 ?
  res.json({ 
    status: 200,
    message: 'Contact delete' 
  }):
  res.json({
    status: 404,
    messege: 'Contact not found'
  })
})

router.patch('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  const {body} = req
    if(body) {
      const upContact = await contactList.updateContact(contactId, body)
    if(upContact){
      res.json({
        status: 200,
        message: 'Contact updated',
        data: upContact
      })
    } else {
      res.json({
        status: 404,
        message: 'Not found'
      })  
    }
  } else {
    res.json({
      status: 400,
      message: 'Error'
    })
  }
})

module.exports = router
