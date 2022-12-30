const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../Controllers');

const { validation, controllerWrapper } = require('../../Middlewares');
const { schemContact } = require('../../Schema');

router.get('/', controllerWrapper(ctrl.getAllContacts));

router.get('/:id', controllerWrapper(ctrl.getContactById));

router.post(
  '/',
  validation(schemContact),
  controllerWrapper(ctrl.postNewContact),
);

router.put(
  '/:id',
  validation(schemContact),
  controllerWrapper(ctrl.putContactById),
);

router.delete('/:id', controllerWrapper(ctrl.delContactById));

module.exports = router;
