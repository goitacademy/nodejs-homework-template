const express = require('express');
const {
  get,
  getById,
  create,
  remove,
  update,
  favorite,
} = require('../../controller/contacts');
const {
  contactPutSchema,
  contactPostSchema,
  contactFavoriteSchema,
} = require('../../schemas');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.patch('/:id/favorite', contactFavoriteSchema, favorite);
router.post('/', contactPostSchema, create);
router.put('/:id', contactPutSchema, update);
router.delete('/:id', remove);

module.exports = router;
