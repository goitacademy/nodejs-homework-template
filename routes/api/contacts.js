const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

const { auth } = require("../../middlewares");

const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:id", auth, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, ctrlWrapper(ctrl.addContact));

router.delete("/:id", auth, ctrlWrapper(ctrl.removeContact));

router.put("/:id", auth, ctrlWrapper(ctrl.updateContact));

router.patch("/:id/favorite", auth, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
