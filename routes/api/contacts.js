const express = require("express");

const ctrl = require("../../controlers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId",  isValidId,  validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite",  isValidId,  validateBody(schemas.updateFavoriteSchrma), ctrl.updateFavorite);

module.exports = router;
