const express = require('express');
const router = express.Router();

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers/`);

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getByid));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavorite));

router.post('/', ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

router.put('/:id', ctrlWrapper(ctrl.updateById));

module.exports = router;
