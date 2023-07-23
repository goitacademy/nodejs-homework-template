const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, ctrlWrapper(ctrl.addContact));

router.put("/:id", authenticate, isValidId, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", authenticate, isValidId, ctrlWrapper(ctrl.updateStatusContact));

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;