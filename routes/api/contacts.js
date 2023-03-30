const express = require('express')
const cntr = require("../../controllers/contacts")
const router = express.Router();
const {validateBody} = require("../../middlewares")
const schemas = require("../../schemas/contacts")

router.get('/', cntr.getAll);

router.get('/:contactId', cntr.getById);

router.post('/',validateBody(schemas.addSchema), cntr.add);

router.delete('/:contactId', cntr.deleteById);

router.put('/:contactId',validateBody(schemas.addSchema), cntr.updateById);

module.exports = router
