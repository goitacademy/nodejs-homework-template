const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../Controllers');

const {
  authMiddleware,
  validation,
  controllerWrapper,
} = require('../../Middlewares');
const {
  joiSchema,
  joiPutSchema,
  favoriteJoiSchema,
} = require('../../Schema/joiContactSchema');

router.get('/', authMiddleware, controllerWrapper(ctrl.getAllContacts));

router.get('/:id', controllerWrapper(ctrl.getContactById));

router.post(
  '/',
  authMiddleware,
  validation(joiSchema),
  controllerWrapper(ctrl.postNewContact),
);

router.put(
  '/:id',
  validation(joiPutSchema),
  controllerWrapper(ctrl.putContactById),
);

router.patch(
  '/:id/favorite',
  validation(favoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact),
);

router.delete('/:id', controllerWrapper(ctrl.delContactById));

module.exports = router;
