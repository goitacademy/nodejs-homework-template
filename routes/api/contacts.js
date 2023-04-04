const express = require('express');

const { getList, getById, add, remove, update } = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const schemas=require("../../schemas/contacts-schemas")

const router = express.Router()

router.get('/', getList);
router.get('/:contactId', getById);
router.post('/', validateBody(schemas.addSchema), add);
router.put('/:contactId', validateBody(schemas.putSchema), update);
router.delete('/:contactId', remove);


module.exports = router;
