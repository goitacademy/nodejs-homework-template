//* req(request, запрос) - объект, содержит всю информацию о запросе, 
//* например  url, method, header, тело, хуки и т.д.
//* res(response, ответ) - объект, который позволяет настроить и отправить ответ
//*  например  часть разметки   res.send('<h2>Contacts page</h2>')

const express = require('express');
const router = express.Router();
//* or like that it's same
// const {Router} =require('express');
// const router = Router();
const {joyValidation} = require('../../middleware');
const {contactSchema} = require ('../../schemas');
const joyValidate = joyValidation(contactSchema);


const {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
} = require("../../controllers/index");

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', addById);
// router.post('/', joyValidate, addById);
router.delete('/:contactId', deleteById);
router.put('/:contactId',joyValidate, updateById);

module.exports = router;
