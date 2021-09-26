const express = require('express')
const router = express.Router()

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')

const { contacts: ctrl } = require('../../controllers/')
console.log(ctrl)

// 1. Получить список всех товаров
// 2. Получить оодин товар по Id
// 3. Добавить товар
// 4. Удалить товар по Id
// 5. Обновить товар по Id

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put(
  '/:contactId',
  validation(contactSchema),
  controllerWrapper(ctrl.updateContact),
)

module.exports = router
