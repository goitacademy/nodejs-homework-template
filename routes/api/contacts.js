const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const { dataSchema } = require('../../validation');
const { status } = require('../../status');
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
      const contact = await listContacts();
      res.status(status.OK).json({
        status: 'success',
        data: {
          contacts: contact
        },
      });
    } catch (error) {
      next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res
        .status(status.OK)
        .json({
          status: 'success',
          data: {
            contacts: contact
        },
      });
    } else { 
      res.status(status.NOT_FOUND)
        .json({
          status:'Not Found',
          message: "Not found"
        })
    }
  } catch (error) {
      next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = await dataSchema.validate(req.body)
    if (error) {
       res.status(status.BAD_REQUEST).json({
          status:'error',
          message: error.details[0].message
        });
    }
    const result = await addContact(req.body);
    res.status(status.CREATED).json(result);
  } catch (err) { 
    next(err);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await removeContact(contactId);
    if (contact) {
      res.status(status.OK).json({ message: "contact deleted" });
    } else { 
      res.status(status.NOT_FOUND).json({ message: "Not found" });
    }
  } catch (error) {
      next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
   try {
     if (Object.keys(req.body).length) { 
        await updateContact(contactId, req.body);
        res.status(status.OK).json({ "message": "Contact was updated!" });
     } else {
        res.status(status.BAD_REQUEST).json({ "message": "missing fields !!!" });
     }

  } catch (error) {
      next(error);
  }

})

module.exports = router
