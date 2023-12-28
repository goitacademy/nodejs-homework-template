const express = require('express');
const  isValidId = require('../../middlewares/isValidId'); 
const validateBody  = require('../../middlewares/validateBody'); 
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();
const Joi = require('joi');


const { listContacts, getById, addContact, removeContact, updateContact, updateStatusContact, listFilteredContacts } = require('../../models/contacts');
const { schemas } = require('../../models/user');


const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(), 

})

router.use('/:contactId', isValidId);


router.get('/', authenticate, async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  }
  catch (error) {
    next(error);
}
})

router.get('/:contactId', authenticate, isValidId, async (req, res, next) => {
  try {
    
    const contact = await getById(req.params.contactId);

    if (contact) {
    res.status(200).json(contact);

    } else {
    res.status(404).json({message: "Not found"});

    }
  } catch(error) {
    next(error);
  }
})

router.post('/', authenticate, validateBody(schemas.addSchema), async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  try {
    const { _id: owner } = req.user;
    const newContact = await addContact({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({message: "missing required name field"});
  }
})

router.delete('/:contactId', authenticate, isValidId, async (req, res, next) => {
    const contactId = req.params.contactId;
  try {
    await removeContact(contactId);
         res.status(200).json({message: "contact deleted"});
 
  } catch (error) {
            res.status(404).json({message: "Not found"});
 
  }
})

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), async (req, res, next) => {
  const contactId = req.params.contactId;
  const { error } = contactSchema.validate(req.body);
    if (error) {
    return res.status(400).json({message: error.details[0].message});
  }
  try {
  const updatedContact = await updateContact(contactId, req.body);
    res.status(200).json(updatedContact);}
 catch (error) {
  res.status(404).json({message: "Not found"});
 
  }

})

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema),async (req, res, next) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  try {
    const updatedContact = await updateStatusContact(contactId, {favorite});
    if (updatedContact) {
    return res.status(200).json(updatedContact)
    } else {
      return res.status(404).json({ message: 'Not found' });
  }
  } catch (error) {
    next(error);
  }
})
router.get('/filtered', authenticate, async (req, res, next) => {
  try {
    const { favorite } = req.query;
    const filteredContacts = await listFilteredContacts(favorite);
    res.status(200).json(filteredContacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;