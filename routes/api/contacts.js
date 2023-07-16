const express = require('express')
// для проверки поступающих обьектов на сервер, чтобы соответствовали требованиям
const Joi = require("joi")
// импортируем обьект методов отправки запросов
const contacts = require('../../models/contacts')

const {HttpError} = require("../../helpers")

const router = express.Router()

// создаем обязательный стандарт передаваемого обьекта 
const addSchema = Joi.object({
  title: Joi.string().required(),
  author:Joi.string().required()
})


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  
  }
 
})
// id или  
router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contacts.getContactById(id)
    if(!result){
            throw HttpError(404, "Not found")
          }
  
    res.json(result)
  } catch (error) {
  

    next(error)
 
  }

  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
