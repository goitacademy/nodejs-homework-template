const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId, authenticate} = require("../../middlewares");
const router = express.Router();

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll );

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContactById);

module.exports = router;
