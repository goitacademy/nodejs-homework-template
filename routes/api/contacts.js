const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const { validateBody } = require('../../middlewares');
const schemas = require("../../schemas/contacts");

router.get('/', ctrl.getAll);

router.get("/:contactId", ctrl.getById);


router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', ctrl.remove);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.update);

module.exports = router;
