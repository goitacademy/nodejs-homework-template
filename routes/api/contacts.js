const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.get('/', auth,ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth,ctrlWrapper(ctrl.getById));

router.post('/', auth, ctrlWrapper(ctrl.add));

router.delete('/:contactId',auth, ctrlWrapper(ctrl.deleteById));

router.put('/:contactId',auth, ctrlWrapper(ctrl.update));

router.patch('/:contactId/favorite', auth, ctrlWrapper(ctrl.updateFavorite));


module.exports = router;
