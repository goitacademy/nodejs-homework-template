const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();
const Contacts = require("../../model");
const {schemaAddContacts}=require("../../utils/validate/schemas/Schema")
// const getAll = require("../../controllers/contacts/getAll");


// router.get("/", getAll);
// console.log(listContacts());

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts }
    })
   
  } catch (error) {
    next(error)
 }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id  = req.params.contactId;
    const selectContact = await Contacts.getContactById(id);
    if (!selectContact) {
     return  res.json({
        status:'error',
        code:404,
        message: "Not found"
      })
    }
    return res.json({
      status: "success",
      code: 200,
      data: {selectContact}
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = await schemaAddContacts.validate(req.body);
    if (error) {
      return res.json({
        status: 'error',
        code:400,
        message: "missing required name field"
      })
       return;
    }
    const contacts = Contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
        code: 201,
        data: {
            result: contacts
        }
    })
 }catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
