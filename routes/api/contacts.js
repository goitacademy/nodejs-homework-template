const express = require('express');
const checkId = require('../../controllers/checkId');
const createContact = require('../../controllers/createContact');
const removeContactController = require('../../controllers/deleteContacts');
const getList = require('../../controllers/getList');
const updateFavorite = require('../../controllers/updateFavorite');
const checkMiddlewar = require('../../middleware/checkIdMiddleware');

const router = express.Router();

router.get('/', getList)

router.get('/:id', checkMiddlewar ,checkId)

router.post('/', createContact)

router.delete('/:id',checkMiddlewar,removeContactController)

router.patch('/:id/favorite',checkMiddlewar, updateFavorite)

module.exports = router
