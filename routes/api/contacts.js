const express = require('express');
const router = express.Router();
const controll = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middleware');

const { schemas } = require('../../models/contacts');

router.get('/', authenticate, controllerWrapper(controll.getAllContacts));

router.get('/:id', authenticate, controllerWrapper(controll.getContactById));

router.post(
    '/',
    authenticate,
    validateBody(schemas.addSchema),
    controllerWrapper(controll.addContact)
);

router.delete(
    '/:id',
    authenticate,
    controllerWrapper(controll.deleteContactById)
);

router.put(
    '/:id',
    authenticate,
    validateBody(schemas.addSchema),
    controllerWrapper(controll.updateContactById)
);

router.patch(
    '/:id/favorite',
    authenticate,
    validateBody(schemas.updateFavoriteSchema),
    controllerWrapper(controll.updateFavorite)
);

module.exports = router;
