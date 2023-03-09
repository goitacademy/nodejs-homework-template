const express = require('express')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require("../../models/contacts.js");
const { v4: uuidv4 } = require('uuid');
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts
      }
  })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId }  = req.params
  try {
    const contact = await getContactById(contactId)
    contact ?
      res.json({
        status: "success",
        code: 200,
        data: {
          contact
        }
      })
      :
      res.json({
        code: 404,
        message: "Not Found"
      })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
})

router.post('/', async (req, res, next) => {
  const body = req.body
  
  try {
    const addedContact = await addContact(body)
    res.json({
      code: 201,
      data: {
        addedContact
      }
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.body;
  try {
    const contacts = await listContacts()
    await removeContact(contactId)
    contacts.id.value === contactId ? 
      res.json({
        message: "contact deleted"
      })
      : res.json({
        code: 404,
        message: "Not Found"
      })
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }

})

router.put('/:contactId', async (req, res, next) => {
  const body = req.body
  try {
    const updated = await updateContact(body.id, body)
    res.json({
      code: 200,
      data: {
        updated
      }
    })
  }  catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
})

module.exports = router
