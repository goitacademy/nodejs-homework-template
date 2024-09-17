// contacts.js API
const express = require('express')

const contactController = require('../../controllers/contactController')

// мидлваре isValidId выдает ошибку при неверном вводе . authenticate - для проверки пользователя на токен и валидный ли он
const { isValidId, authenticate } = require('../../middlewares/index')

const router = express.Router()

// получение всего списка
router.get('/', authenticate, contactController.getContacts)

// получение инф. по ид
router.get('/:id', authenticate, isValidId, contactController.getContact)

// // добавление контакта
router.post('/', authenticate, contactController.addNewContact)

// // удаление контакта
router.delete('/:id', authenticate, isValidId, contactController.deleteContact)

// // Обновление данных контакта  с выведением информ об отсутствующем элементе и всём body { message: "missing fields" }
router.put('/:id', isValidId, contactController.addChangeContact)

// переключатель favorite маршрут
router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  contactController.addChangeFavorite
)

module.exports = router
