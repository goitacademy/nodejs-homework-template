const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../Controllers');

const { validation, controllerWrapper } = require('../../Middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contact');

router.get('/', controllerWrapper(ctrl.getAllContacts));

router.get('/:id', controllerWrapper(ctrl.getContactById));

router.post('/', validation(joiSchema), controllerWrapper(ctrl.postNewContact));

router.put(
  '/:id',
  validation(joiSchema),
  controllerWrapper(ctrl.putContactById),
);

router.patch(
  '/:id/favorite',
  validation(favoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite),
);

router.delete('/:id', controllerWrapper(ctrl.delContactById));

module.exports = router;
