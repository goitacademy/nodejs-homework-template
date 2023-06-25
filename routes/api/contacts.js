const express = require("express");

const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middleware");

const { schemas } = require("../../models");

const ctrl = require("../../controller");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

router.put( "/:contactId", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
