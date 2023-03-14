const express = require('express');

const { validation, auth } = require('../../middlewares');
const { joiSchema: contactSchema, favoriteJoiSchema } = require('../../models/contact');
const { ctrlWrap } = require('../../helpers');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrap(ctrl.getContacts));

router.get('/:contactId', ctrlWrap(ctrl.getById));

router.post('/', auth, validation({ schema: contactSchema, message: "missing required field" }), ctrlWrap(ctrl.add));

router.put('/:contactId', validation({ schema: contactSchema, message: "missing fields" }), ctrlWrap(ctrl.updateById));

router.patch('/:contactId/favorite', validation({ schema: favoriteJoiSchema, message: "missing field favorite" }), ctrlWrap(ctrl.updateFavoriteById));

router.delete('/:contactId', ctrlWrap(ctrl.removeById));

module.exports = router;
