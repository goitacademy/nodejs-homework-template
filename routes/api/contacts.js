const express = require('express')

const router = express.Router()


const contactsOperations = require('../../models/contacts')
const createError = require("http-errors");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data : {
        result: contacts
      }
    });
  } catch (error) {
    next(error);
  }

})

router.get('/:id', async (req, res, next) => {
  try {
    const  { id } = req.params;
    const result = await contactsOperations.getById(id);

    if(!result) {
      throw createError(404,"Not found");
      // const error = new Error("Not found"); // создаем ошибку
      // error.status = 404; // присваиваем ей статус
      // throw error; // выбрасываем ошибку
    }

    res.json({
      status: 'success',
      code: 200,
      data : {
        result
      }
    });
  } catch (error) {
    next(error);
  }
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
