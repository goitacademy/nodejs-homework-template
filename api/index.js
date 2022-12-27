const express = require('express');
const router = express.Router();
const ctrlContact = require('../controller');
const { validateBody } = require('../middlewares');
const { schemas } = require('../service/schemas/contact');


router.get('/contacts', ctrlContact.get);

router.get('/contacts/:id', ctrlContact.getById);

router.post('/contacts', validateBody(schemas.addSchema), ctrlContact.create);

router.put('/contacts/:id', validateBody(schemas.addSchema), ctrlContact.update);

router.patch('/contacts/:id/status', validateBody(schemas.updateFavoriteSchema), ctrlContact.updateStatus);

router.delete('/contacts/:id', ctrlContact.remove);

module.exports = router;