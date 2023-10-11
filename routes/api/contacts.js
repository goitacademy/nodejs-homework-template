const express = require("express");

const ctrl = require('../../controllers/contacts')
const {validateBody, isValidId, authenticate} = require('../../middlewares')
// const schemas = require('../../schemas/contacts')
const {schemas} = require('../../models/contact')

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);
router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);
router.delete("/:id", authenticate, isValidId, ctrl.deleteContactById);
router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

module.exports = router;
