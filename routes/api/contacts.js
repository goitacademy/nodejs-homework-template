const express = require("express");

const ctrl = require('../../controllers/contacts')
const {validateBody} = require('../../middlewares')
const schemas = require('../../schemas/contacts')

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.get("/:id", ctrl.getContactById);
router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContactById);
router.delete("/:id", ctrl.deleteContactById);

module.exports = router;
