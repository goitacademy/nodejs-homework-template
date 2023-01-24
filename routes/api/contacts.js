const express = require('express');
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const {
  addDataValid,
  updateDataValid
} = require('../../dataValidation/dataValidation');


router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  if(contacts) {
    return res.status(200).json({contacts});
  }
  next()
});

router.get('/:contactId', async (req, res, next) => {
  const foundedContact = await getContactById(req.params.contactId);
  if (foundedContact) {
    return res.status(200).json({ data: foundedContact });
  }
  next();

})

router.post('/',addDataValid, async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (newContact) {
    return res.status(201).json({ data: newContact });
  }
  next();
})

router.delete('/:contactId', async (req, res, next) => {
  const deleteContact = await removeContact(req.params.contactId);
  if (deleteContact) {
    return res
      .status(200)
      .json({ message: "contact deleted", data: deleteContact });
  }
  next();

})

router.put('/:contactId',updateDataValid, async (req, res, next) => {
  const renewedContact = await updateContact(req.params.contactId, req.body);

  if (renewedContact) {
    return res.status(200).json({ data: renewedContact });
  }
  next();

})

module.exports = router
