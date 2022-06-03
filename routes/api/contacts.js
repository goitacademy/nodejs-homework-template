const express = require('express')
const router = express.Router()
const actions = require('../../models/contacts')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

router.get('/', async (req, res, next) => {

  try {
    const result = await actions.listContacts()
  
    return res.status(200).json({ contacts: result, status: 'success' })
  } catch (err) {
      console.log(err.message)
    // res.status(500).json({message: err.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  
  try {
    const result = await actions.getContactById(contactId)

    // if (!result) {

    // }
    // else {

      return res.status(200).json({ contacts: result, status: 'success' })
  //  } 
  } catch (err) {
      
      console.log(err.message)
    // res.status(500).json({message: err.message})
  }
})

router.post('/', async (req, res, next) => {
  const { body } = req

  const result = await actions.addContact({id: getRandomInt(11, 1000), ...body})

  res.status(201).json({ body: result })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    await actions.removeContact(contactId)

    // if (!result) {

    // }
    // else {

      return res.status(200).json({ message: 'contact deleted', status: 'success' })
  //  } 
  } catch (err) {
      
      console.log(err.message)
    // res.status(500).json({message: err.message})
  }

})

router.put('/:contactId', async (req, res, next) => {
  const { body, params } = req
  
  try {
    const result = await actions.updateContact(params.contactId, body)

    // if (!result) {

    // }
    // else {

      return res.status(200).json({ body: result, message: 'contact update', status: 'success' })
  //  } 
  } catch (err) {
      
      console.log(err.message)
    // res.status(500).json({message: err.message})
  }
})

module.exports = router

