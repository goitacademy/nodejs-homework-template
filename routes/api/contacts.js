const express = require("express");

const ctrl = require("../../controllers/contacts");
const { Contact } = require("../../models/contact");

const { validateContact } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.deletebyId);

router.put("/:contactId", validateContact(Contact), ctrl.updateById);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;