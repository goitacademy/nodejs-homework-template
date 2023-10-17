// глобальні імпорти
const express = require('express');
const Joi = require('joi'); // метод валадації сталих виразів
// локальні імпорти
const {HttpError} = require('../../helpers'); // обробка помилок
const controller = require('../../controler')

const router = express.Router();




router.get('/', controller.getAllContacts) 

router.get('/:contactId', controller.getContactById);

router.post('/', controller.newContact);

router.delete('/:contactId', controller.deleteContact);

router.put('/:contactId', controller.updatedContactById);

router.patch('/:contactId/favorite', controller.favoritStatus);



module.exports = router;
