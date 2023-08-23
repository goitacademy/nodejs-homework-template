const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../fetch");

const { isValidId } = require("../../middleware");
const { validateContact } = require("../../middleware/validationMiddleware")

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateContact, ctrl.addNewContact);

router.delete("/:contactId", isValidId, ctrl.removeById);

router.put("/:contactId", validateContact, ctrl.editById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;