// contacts.js API
const express = require('express')


const contactController = require('../../controllers/contactController')

const router = express.Router()


// получение всего списка
router.get('/', contactController.getContacts)

// получение инф. по ид
router.get('/:id', contactController.getContact)

// добавление контакта
router.post('/', contactController.addNewContact)

// удаление контакта
router.delete('/:id', contactController.deleteContact)

// Обновление данных контакта  с выведением информ об отсутствующем элементе и всём body { message: "missing fields" }
router.put('/:id', contactController.addChangeContact)

module.exports = router
