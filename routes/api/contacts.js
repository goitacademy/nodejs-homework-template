const express = require('express')
const { nanoid } = require('nanoid')
const router = express.Router();

const {contacts: ctrl} = require('../../controller')
const ctrlWrapper = require('../../middlewares/ctrlWrapper');


router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:id', ctrlWrapper(ctrl.deleteById))

router.patch('/:id', ctrlWrapper(ctrl.updateById))

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateStatusContact))


module.exports = router
