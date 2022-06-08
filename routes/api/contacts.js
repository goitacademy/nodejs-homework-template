const express = require("express");
const ctrl = require("../../controllers/controllers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addNewContact);

router.put("/:contactId", ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
