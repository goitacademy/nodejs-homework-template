const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contactsController");
const validation = require("../../middlewares/validation");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const schems = require("../../schemas/contactsSchemas");

const validateMiddleware = validation(schems);

router.get("/", ctrlWrapper(ctrl.allContacts));

router.get("/:id", ctrlWrapper(ctrl.contactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.deleteContact));

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;
