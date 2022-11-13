const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require('../../middelwares');

const { contacts: ctrl } = require('../../controllers/index');




router.get('/',ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getByIdContact));

router.post('/', ctrlWrapper(ctrl.add));

router.put('/:id', ctrlWrapper(ctrl.update));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:id', ctrlWrapper(ctrl.remove));


module.exports = router;















