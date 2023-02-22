const express = require('express')
const Joi = require('joi');

const router = express.Router()

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts')


const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(3).max(30).required(),
});


router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  console.log(contacts);
  res.status(200).json({contacts})
})

router.get('/:id', async (req, res, next) => {
  const contact = await getContactById(req.params.id)

  if (!contact) {
    return res.status(404).json({ message: `Not found contact with id ${req.params.id}`})
  } else {
    res.status(200).json({ contact })
  }
})

router.post('/', async (req, res, next) => {

  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }

})

router.delete('/:id', async (req, res, next) => {
  const contact = await removeContact(req.params.id)

  if (!contact) {
    return res.status(404).json({ message: `Not found contact with id ${req.params.id}`})
  } else {
    res.status(200).json({ "message": "contact deleted" })
  }
})

router.put('/:id', async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const contact = await updateContact(req.params.id, req.body)
  console.log(contact);

  if (!contact) {
    return res.status(404).json({ message: `Not found contact with id ${req.params.id}`})
  } else {
    res.status(200).json({ contact })
  } 

})

module.exports = router
