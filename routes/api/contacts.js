const express = require("express");
const router = express.Router();

const { validation , ctrlWrapper} = require('../../middelwares');
const  schema  = require('../../schema/index');

const validateMiddleWares = validation(schema);

const { contacts: ctrl } = require('../../controllers/index');





router.get('/',ctrlWrapper( ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleWares,ctrlWrapper(ctrl.add));

router.put('/:id',  validateMiddleWares,ctrlWrapper(ctrl.update));

router.delete('/:id', ctrl.remove);


module.exports = router;















