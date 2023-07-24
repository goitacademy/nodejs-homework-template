// contacts.js API
const express = require('express')

const contactController = require('../../controllers/contactController')

// мидлваре выдает ошибку при неверном вводе ид
const { isValidId } = require('../../middlewares/index')

const router = express.Router()

// получение всего списка
router.get('/', contactController.getContacts)

// получение инф. по ид
router.get('/:id', isValidId, contactController.getContact)

// // добавление контакта
router.post('/', contactController.addNewContact)

// // удаление контакта
router.delete('/:id', isValidId, contactController.deleteContact)

// // Обновление данных контакта  с выведением информ об отсутствующем элементе и всём body { message: "missing fields" }
router.put('/:id', isValidId, contactController.addChangeContact)

// переключатель favorite маршрут
router.patch('/:id/favorite', isValidId, contactController.addChangeFavorite)

module.exports = router
