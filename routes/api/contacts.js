const express = require('express')
 const contacts = require("../../models/contacts")
const router = express.Router()
const HttpError = require("../../helper")

router.get('/', async (req, res, next) => {
  try {
    const response = await contacts.listContacts()
    if(!response){
      throw HttpError(404, "Not Found")
    }
    res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }

})

router.get('/:contactId', async (req, res, next) => {
try {
  const {contactId} = req.params
const response = await contacts.getContactById(contactId)
if(!response){
  throw HttpError(404, "Not Found")
}
  res.status(response.status).json(response)
} catch (error) {
  next(error)
}

})

router.post('/', async (req, res, next) => {
  try {
    const {body} = req
    const response = await contacts.addContact(body)
    if(!response){
      throw HttpError(404, "Not Found")
    }else if (response.status === 400){
      throw HttpError(response.status, response.message)
    }
    res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const response = await contacts.removeContact(contactId)
    if(!response){
      throw HttpError(404, "Not Found")
    }
    res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }

})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const {body} = req
    const response = await contacts.updateContact(contactId, body)
    if(!response){
      throw HttpError(404, "Not Found")
    }else if (response.status === 400){
      console.log(response.status)
      console.log(response.message)
      throw HttpError(response.status, response.message)
    }
    res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }

})

module.exports = router

