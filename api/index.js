const express = require('express');
const router = express.Router();

const { get,
  getById,
  create,
  update,
  updateFavorite,
  remove} = require('../controllers/contacts');
const isValidId = require('../middlewares/isValidId');
const validateBody = require('../decorators/validateBody');
const {schemas} = require('../schemas/contact')

router.get('/contacts', get);

router.get('/contacts/:id', isValidId, getById);

router.post('/contacts', validateBody(schemas.addSchema), create);

router.put('/contacts/:id', validateBody(schemas.addSchema), isValidId, update);

router.patch('/contacts/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

router.delete('/contacts/:id', isValidId, remove);

module.exports = router;