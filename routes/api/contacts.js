const express = require('express')
const Joi = require('joi')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

// *! Получаем все контакты
router.get('/', async (req, res, next) => {
  const list = await listContacts()

  res.status(200).send(list)
})
// *!  Ищем контакт по ид
router.get('/:contactId', async (req, res, next) => {
  const getById = await getContactById(req.params.contactId)

  // *! Если нет ИД пишем ошибку
  if (!getById) {
    res.status(404).send({ message: 'Not found' })
  }

  res.status(200).send(getById)
})

// *! Добавляем новый контакт
router.post('/', async (req, res, next) => {
  const newContact = await addContact(req.body)

  Validation(req, res)
  res.status(201).json(newContact)
})
// *!  Удаляем контакт по ИД
router.delete('/:contactId', async (req, res, next) => {
  const deleteId = await removeContact(req.params.contactId)

  // *! Если нет ИД выдаём ошибку
  if (!deleteId) {
    res.status(404).json({ message: 'Not found' })
  }
  res
    .status(200)
    .json({ message: `contact deleted width id${req.params.contactId} ` })
})

// *!  Перезаписываем контакт по ИД
router.put('/:contactId', async (req, res, next) => {
  const update = await updateContact(req.params.contactId, req.body)
  const { name, email, phone } = req.body

  Validation(req, res)

  // *! если в Боди нету одного параметра выдаем ошибку
  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields' })
  }
  // *! если нету ИД выдаем ошибку
  if (!update) {
    res.status(404).json({ message: 'Not found' })
  }

  res.status(200).send(update)
})

function Validation(req, res) {
  // *! Делаем валидацию на входящие данные
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.number().required(),
  })

  // *! Ловим ошибку
  const validatError = schema.validate(req.body)

  if (validatError.error) {
    return res.status(400).json({ message: validatError.error })
  }
}
module.exports = router
