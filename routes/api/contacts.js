
const express = require('express')

const ctrl = require("../../controllers/contacts")

// const { validation } = require("../../middelwares");
// const {schemas} = require("../../model/contact")





const router = express.Router()



router.get('/', ctrl.getAll)

// router.get('/:contactId', ctrl.getById)

// router.post('/', validation(schemas.addSchema), ctrl.add)

// router.delete("/:contactId", ctrl.deleteById);

// router.put("/:contactId", ctrl.chengeById);


module.exports = router
