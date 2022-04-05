const express = require('express');

const validation = require('../../middlewares/validation');
const {joiSchema, statusJoiSchema} = require('../../models/contact');
const {contacts} = require('../../controllers');

const router = new express.Router();

router.get('/', contacts.getAll);
router.get('/:contactId', contacts.getById);
router.post('/', validation(joiSchema), contacts.add);
router.delete('/:contactId', contacts.removeById);
router.put('/:contactId', validation(joiSchema), contacts.updateById);
router.patch('/:contactId/favorite', validation(statusJoiSchema), contacts.updateStatusContact);

module.exports = router;
