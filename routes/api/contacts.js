const controller = require("../../controllers/contacts")
const express = require("express");
const validateBody = require("../../middlewar/validate-body");
const { addSchema, updateSchema, updateFavorite } = require("../../utils/validation");
const isValidId = require("../../middlewar/is-valid-id");

const router = express.Router();

router.get("/", controller.getContactsList);

router.get("/:contactId", isValidId, controller.getContact);

router.post("/", validateBody(addSchema), controller.addContact);

router.delete("/:contactId", isValidId, controller.deleteContact);

router.put("/:contactId", isValidId, validateBody(updateSchema), controller.updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(updateFavorite), controller.updateFavorite);

module.exports = router;
