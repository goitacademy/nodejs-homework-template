const express = require('express');

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/addSchema");

const router = express.Router();


router.get('/', ctrlWrapper(ctrl.getList));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

router.put('/:id', validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));


module.exports = router;
