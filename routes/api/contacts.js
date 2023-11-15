const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers');
const Contact = require('../../service/schemas/task');

// Получение всех контактов
router.get('/', async (req, res, next) => {
  try {
      const contacts = await Contact.find();
      res.json(contacts);
  } catch (error) {
      next(error);
  }
});

// Получение контакта по ID
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});


// Создание нового контакта
router.post('/', async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Удаление контакта по ID
router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully', deletedContact });
  } catch (error) {
    next(error);
  }
});

// Обновление контакта по ID
router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', contactsController.updateStatusContact);


module.exports = router;

