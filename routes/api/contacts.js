const express = require('express')

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts')

  const catchAsync = require("../../utils/catchAsync")
  const {joiUserValidator} = require('../../utils/joiValidator')

const router = express.Router()

router.get('/', async (req, res) => {
  try {

    const dataContacts = await listContacts()

    res.status(200).json({
      msg: "success",
      dataContacts
    })
    
  } catch (error) {
    console.log(error)
  }
 
})


router.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    
    const findContact = await getContactById(contactId)
  
    if(findContact) {
      return res.status(200).json({
        msg: 'good',
        findContact
      })
    } else {
      return res.status(404).json({
        message: "Not found"
      })
    }
  } catch (error) {
    console.log(error.messenge)
  }

})

router.post('/', async (req, res) => {

  const { error, value } = await joiUserValidator(req.body)

  if (error) {
    return res.status(400).json({
      message: "missing required name field"
    })
  }

  const {name, email, phone} = value


  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "missing required name field"
    })
  }

  

  const createNewContact = await addContact (name, email, phone);
  
  if (!createNewContact) {
    return res.status(400).json({
      message: "missing required try agen"
    })
  }

  res.status(201).json(
    createNewContact
  )

})

router.delete('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;

    const remove =  await removeContact(contactId)
  
    if(remove) {
      return res.status(200).json({
        message: "contact deleted"
      })
    } else {
      return res.status(404).json({
        message: "Not found"
      })
    }
  
  } catch (error) {
    console.log(error.messenge)
  }

})

router.put('/:contactId', async (req, res, next) => {

  const  { error, value }  = await joiUserValidator(req.body)


  if (error) {
    return res.status(400).json({
      message: "missing required name field"
    })
  }

  const {contactId} = req.params;
  const body = value

  if (!body) {
    return res.status(400).json({
      "message": "missing fields"
    })
  }

  const updCont = await updateContact (contactId, body)

  if (!updCont) {
    return res.status(404).json({
      message: "Not found"
    })
  }

  res.status(200).json(updCont)
})

module.exports = router
