const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares');
const { joiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(joiSchema), ctrl.add);

router.put('/:contactId', validation(joiSchema), ctrl.updateById);

router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
