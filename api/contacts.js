const express = require('express');
const router = express.Router();
const { getAll, getById, add, updateById, deleteById, updateFavourite } = require('../../controllers/contacts');

const { validateBody, authCheck } = require('../../middlewares');
const { schemas } = require('../../models/contact');


router.get('/', authCheck, getAll);

router.get('/:contactId', getById);

router.post('/', authCheck, validateBody(schemas.addScheme), add);

router.put('/:contactId', validateBody(schemas.addScheme), updateById);

router.delete('/:contactId', deleteById);

router.patch('/:contactId/favorite', validateBody(schemas.updateFavoriteSchema), updateFavourite);

module.exports = router;