const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const isValid = require("../../middlewares/isValidId");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValid, ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValid, ctrl.removeById);

router.put("/:contactId", isValid, ctrl.updateById);

router.patch("/:contactId/favorite", isValid, ctrl.updateStatusContact);

module.exports = router;
