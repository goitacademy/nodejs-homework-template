const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts")

router.get("/", ctrl.getAll)

router.get("/:contactId", ctrl.getById)

router.post("/",ctrl.addContact)

router.delete("/:contactId", ctrl.deletecontact)

router.put("/:contactId", ctrl.updateContact)

router.patch("/:contactId/favorite", ctrl.updateFavorite)
module.exports = router;
