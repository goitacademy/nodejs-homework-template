/* eslint-disable no-unused-vars */
const express = require('express');

const { joiContactSchema } = require('../../models/contact');
const { validation, controllerWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');

const validationMiddleware = validation(joiContactSchema);

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validationMiddleware, controllerWrapper(ctrl.add));

router.delete('/:contactId', ctrl.delById);

router.patch('/:contactId/favorite', ctrl.updateFavorite);

router.put('/:contactId', validationMiddleware, ctrl.updateById);

module.exports = router;
