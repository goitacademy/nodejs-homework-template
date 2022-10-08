const express = require('express');
const router = express.Router();
const controll = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validateBody } = require('../../middleware');

const { schemas } = require('../../models/contacts');

router.get('/', controllerWrapper(controll.getAllContacts));

router.get('/:id', controllerWrapper(controll.getContactById));

router.post(
    '/',
    validateBody(schemas.addSchema),
    controllerWrapper(controll.addContact)
);

router.delete('/:id', controllerWrapper(controll.deleteContactById));

router.put(
    '/:id',
    validateBody(schemas.addSchema),
    controllerWrapper(controll.updateContactById)
);

router.patch(
    '/:id/favorite',
    validateBody(schemas.updateFavoriteSchema),
    controllerWrapper(controll.updateFavorite)
);

module.exports = router;
