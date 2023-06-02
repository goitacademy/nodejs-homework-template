const express = require('express');
const router = express.Router();

const ctrlContact = require('../controller');
const { isValidId } = require('../middlewares/isValidId');
// const { validateBody } = require('../decorators/validateBody');
// const {schemas} = require('../schemas/contact')

router.get('/contacts', ctrlContact.get);

router.get('/contacts/:id', isValidId, ctrlContact.getById);

// router.post('/contacts', validateBody(schemas.addSchema), ctrlContact.create);

// router.put('/contacts/:id', validateBody(schemas.addSchema), isValidId, ctrlContact.update);

// router.patch('/contacts/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlContact.updateFavorite);

// router.delete('/contacts/:id', isValidId, ctrlContact.remove);

module.exports = router;