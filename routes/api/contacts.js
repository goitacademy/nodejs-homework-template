const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require('../../middelwares');

const { contacts: ctrl } = require('../../controllers/index');

const  validation  = require("../../middelwares/validation");
const {joiSchema , joiSchemafavorite} = require("../../model/contacts");



router.get('/',ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getByIdContact));

router.post('/',validation(joiSchema), ctrlWrapper(ctrl.add));

router.put('/:id',validation(joiSchema), ctrlWrapper(ctrl.update));

router.patch('/:id/favorite',validation(joiSchemafavorite), ctrlWrapper(ctrl.updateFavoriteContact));

router.delete('/:id', ctrlWrapper(ctrl.remove));


module.exports = router;















