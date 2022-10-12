const express = require('express');

const ctrl = require('../../controllers/contacts')

const { ctrlWrapper } = require('../../helpers')

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrl.getById)

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:contactId', ctrlWrapper(ctrl.remove))

router.put('/:contactId', ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateFavorite))

module.exports = router
