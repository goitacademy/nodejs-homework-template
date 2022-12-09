const express = require('express');

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers");


const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { validation, ctrlWrapper } = require("../../middlewares");
const validateMiddleware = validation(joiSchema);

const router = new express.Router();


router.get('/', ctrlWrapper(getAll) );

router.get('/:contactId', ctrlWrapper(getById));

router.post('/', validateMiddleware, ctrlWrapper(add));

router.delete('/:contactId', ctrlWrapper(deleteById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(updateById));

router.patch('/:contactId/favorite',
    validation(favoriteJoiSchema), updateFavorite);

module.exports = router;
