const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth")

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers/`);

router.get('/',auth, ctrlWrapper(ctrl.getAll));

router.get('/:id',auth, ctrlWrapper(ctrl.getByid));

router.patch('/:id/favorite',auth, ctrlWrapper(ctrl.updateFavorite));

router.post('/', auth, ctrlWrapper(ctrl.add));

router.delete('/:id',auth, ctrlWrapper(ctrl.removeById));

router.put('/:id',auth, ctrlWrapper(ctrl.updateById));

module.exports = router;
