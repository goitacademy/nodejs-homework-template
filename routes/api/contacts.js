const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { auth } = require("../../middlewares");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, ctrl.getById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", auth, ctrl.deleteContact);

router.put("/:contactId", auth, ctrl.updateContact);

router.patch("/:contactId/favorite", auth, ctrl.updateStatusContact);

module.exports = router;
