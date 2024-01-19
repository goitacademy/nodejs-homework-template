// const fs = require('fs/promises')

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Путь к модели Contact

// Здесь будут другие маршруты (GET, POST, DELETE и т.д.)

// PATCH маршрут для обновления поля favorite контакта
router.patch('/:contactId/favorite', async (req, res, next) => {
  // ... код, который я предоставил ранее ...
});

// Функция для обновления поля favorite контакта
async function updateStatusContact(contactId, update) {
  // ... реализация функции ...
}

module.exports = router;