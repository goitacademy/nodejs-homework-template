// contacts.js
const express = require('express')
// для проверки поступающих обьектов на сервер, чтобы соответствовали требованиям
const Joi = require('joi')
// импортируем обьект методов отправки запросов
const contacts = require('../../models/contacts')

const { HttpError } = require('../../helpers')

const router = express.Router()

// создаем обязательный стандарт передаваемого обьекта
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await contacts.getContactById(id)
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required fields' });
    }

    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await contacts.removeContact(id)
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'Contact deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})
// ок
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const updatedContact = await contacts.updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router
