const express = require('express');
const ctrl = require('../../controllers/contacts'); // обєкт з ф-ями контроллерами
const router = express.Router(); // обєкт з описом маршрутів
const { ctrlWrapper } = require('../../helpers');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.add));

router.put('/:id', ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

module.exports = router;
