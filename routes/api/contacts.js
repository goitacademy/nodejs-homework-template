
const express = require('express')


const { validateBody } = require("../../middelwares");
const schemas = require("../../schemas/contact")

const ctrl = require("../../controllers/contacts")



const router = express.Router()



router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.chengeById);


module.exports = router
