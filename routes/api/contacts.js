const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const isValid = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValid, ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValid, ctrl.removeById);

router.put("/:contactId", isValid, ctrl.updateById);

router.patch("/:contactId/favorite", isValid, ctrl.updateStatusContact);

module.exports = router;
