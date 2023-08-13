const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const isValid = require("../../middlewares/isValidId");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValid, ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValid, ctrl.remove);

router.put("/:contactId", isValid, ctrl.update);

router.patch("/:contactId/favorite", isValid, ctrl.updateFavorite);

module.exports = router;
