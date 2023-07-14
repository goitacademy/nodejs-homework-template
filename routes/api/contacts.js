const express = require('express')

const ctrl = require("../../controllers/contacts");
const router = express.Router();

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");


router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.delete('/:id', ctrl.deleteById)

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById)

module.exports = router
