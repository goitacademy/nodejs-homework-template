
const contactsService = require('../../../services/contacts')
const express = require('express');
const validateBody = require('../../middlewares/validateBody');
const createContactBodySchema = require('../../../schemas/contacts/createContact');
const updateContactBodySchema = require('../../../schemas/contacts/updateContact');
const updateFieldFavorite = require('../../../schemas/contacts/updateFieldFavorite');
const validateObjectId = require('../../middlewares/validateByMongoose');

const router = express.Router()

router.get('/', async (req, res, next) => {
  console.log(req.body);
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', validateObjectId, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(contactId);
    res.status(200).json(contact);
  }catch (err) {
            next(err);
        }
})

router.post('/', validateBody(createContactBodySchema), async (req, res, next) => {
  try {
     const contact = await contactsService.addContact(req.body);
    res.status(201).json(contact);
  }catch (err) {
            next(err);
        }
})

router.delete('/:contactId', validateObjectId, async (req, res, next) => {
  const { contactId } = req.params;
  try {
   await contactsService.removeContact(contactId);
    res.status(200).json({
      message: "contact deleted",
    });
  }catch (err) {
            next(err);
        }
})

router.put('/:contactId', validateObjectId, validateBody(updateContactBodySchema), async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const contact = await contactsService.updateContact(contactId, body);
  res.status(200).json(contact)
  }catch (err) {
            next(err);
        }
})

router.patch('/:contactId/favorite', validateObjectId, validateBody(updateFieldFavorite), async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const contact = await contactsService.updateStatusContact(contactId, body);
  res.status(200).json(contact)
  }catch (err) {
            next(err);
        }
});



module.exports = router
