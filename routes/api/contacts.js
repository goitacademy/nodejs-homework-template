const express = require('express')
const {ctrlWrapper} = require('../../helpers/')

const router = express.Router()

const { getAll, getById, createContact, deleteId, updateContact,  } = require('../../controlers');
const {validateBody} = require('../../middlewares');
const {schemas} = require('../../models/contact');

router.get('/', ctrlWrapper(getAll))

router.get('/:id', ctrlWrapper(getById));

router.post('/', validateBody(schemas.addShema), ctrlWrapper(createContact))

router.delete('/:id', ctrlWrapper(deleteId))

router.put('/:id', validateBody(schemas.updateShema), ctrlWrapper(updateContact))

router.put('/:id/favorite', validateBody(schemas.favoriteShema), ctrlWrapper(updateContact))

module.exports = router
