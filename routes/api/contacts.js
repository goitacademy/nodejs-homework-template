const express = require('express')

const router = express.Router() //Этот объект позволяет группировать обработчики маршрутов, связанные с определенными путями URL то есть создает страничку записной книжки, а не новую книжку 

const ctrl = require('../../controllers/contacts') // контроллеры те функции, которые обрабатывают запросы к определенным маршрутам (или эндпоинтам) в API (route handlers)

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getContactById)

router.post('/',ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContact)


// PUT запрос всегда все обновляет => если мы что-то меняем, то перезаписываем полностью наше элемент и вводим все поля, и те которые изменились, и те которые нет
router.put('/:contactId', ctrl.updateContact)

module.exports = router
