const express = require('express')

const router = express.Router()

const contactsList = require("../../helpers/contacts");


router.get('/', async (req, res, next) => {
  const contacts = await contactsList.listContacts();
  console.table(contacts);
  res.json({status: "accepted", status_code: 200, data: contacts })
  // next();
})


router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsList.getContactById(req.params.contactId);
  if (!contact) {
    res.json({ status: "rejected", status_code: 404, message: "Not found" })
  } else {
    res.json({ status: "accepted", status_code: 200, data: contact })
  }
  // next();
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  
  let err = !name ? 'name,' : ''
  err += !email ? 'email,' : ''
  err += !phone ? 'phone' : ''
  err = err && err.slice(-1) === ',' ? err.slice(0, err.length - 1) : err
  
  if (err) {
    res.json({ status: "rejected", status_code: 400, message: `missing required ${err} field` })
  }
  else {
    const addedContact = await contactsList.addContact(name, email, phone);
    if (!addedContact) {
      res.json({ status: "rejected", status_code: 410, message: "Error add" })
    } else {
      res.json({ status: "accepted", status_code: 201, data: addedContact })
    }
  }
  // next()
})


router.delete('/:contactId', async (req, res, next) => {
  const removedContact = await contactsList.removeContact(req.params.contactId);
  if (!removedContact) {
      res.json({ status: "rejected", status_code: 404, message: "Not found" })
    } else {
      res.json({ status: "accepted", status_code: 200, message: "contact deleted" })
    }
  // next();
})


router.put('/:contactId', async (req, res, next) => {
  console.log(req.params.contactId);
  console.log(req.body);
  if (!req.body) {
    res.json({ status: "rejected", status_code: 400, message: "missing fields" })
  } else {
    const { name, email, phone } = req.body
    const updatedContact = await contactsList.updateContact(req.params.contactId, name, email, phone);
    if (!updatedContact) {
      res.json({ status: "rejected", status_code: 404, message: "Not found" })
    } else {
      res.json({ status: "accepted", status_code: 200, data: updatedContact })
    }
  }
  // next()
})

module.exports = router