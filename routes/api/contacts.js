const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const isValidId = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.addContact);

router.put("/:id", ctrl.updateById);

router.patch("/:id/favorite", isValidId, ctrl.updateStatusContact);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
