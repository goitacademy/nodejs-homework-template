const express = require("express");

const ctrl = require('../../controllers/contacts')
const {validateBody, isValidId} = require('../../middlewares')
const schemas = require('../../schemas/contacts')

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.get("/:id", isValidId, ctrl.getContactById);
router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);
router.delete("/:id", isValidId, ctrl.deleteContactById);
router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

module.exports = router;
