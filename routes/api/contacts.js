const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));
router.get('/:id', authenticate, ctrlWrapper(ctrl.getById));
router.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));
router.delete('/:id', authenticate, ctrlWrapper(ctrl.deleteById));
router.put('/:id', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));
router.patch('/:id/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
