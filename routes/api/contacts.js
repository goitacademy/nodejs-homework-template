const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();
const Contacts = require("../../model");
const { schemaAddContacts, schemaUpdateContact } = require("../../utils/validate/schemas/Schema");


router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.status(200).json({
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
     return  res.status(404).json({
        status:'error',
        code:404,
        message: "Not found"
      })
    }
    return res.status(200).json({
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
    const { error } =  schemaAddContacts.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        code:400,
        message: "missing required name field"
      })
       return;
    }
    const contacts = await Contacts.addContact(req.body);
    
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts }
        
    });
 }catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    index = await Contacts.removeContact(id);
    if (index===-1) {
      res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found"
        });
        return;
    }
     res.status(200).json({
        status: "success",
        code: "200",
        message: "contact deleted"
    });
  } catch (error) {
       next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
     const id = req.params.contactId;
     const body = req.body;
    if (await schemaUpdateContact.validate(body)) {
      const contacts = await Contacts.updateContact(id, body);
      if (contacts) {
        return res.status(200).json({
          status: "success",
          code: 200,
          data: { contacts }
        })
      }
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found"
      })
    }
      return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields"
    });
   
  } catch (error) {
    next(error)
  }
});

module.exports = router
