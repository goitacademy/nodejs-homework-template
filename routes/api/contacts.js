const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { isValidId } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.createNew);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, ctrl.editById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
