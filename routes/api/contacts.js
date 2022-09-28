const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", asyncWrapper(ctrl.getAll));

router.get("/:contactId", ctrl.getById);

router.post("/", asyncWrapper(ctrl.addContact));

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", asyncWrapper(ctrl.changeContact));

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
