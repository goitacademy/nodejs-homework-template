const express = require("express");

const contactsCtrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addScheme } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", contactsCtrl.getAll);

router.get("/:contactId", contactsCtrl.getById);

router.post("/", validateBody(addScheme), contactsCtrl.add);

router.delete("/:contactId", contactsCtrl.removeById);

router.put("/:contactId", validateBody(addScheme), contactsCtrl.updateById);

module.exports = router;
