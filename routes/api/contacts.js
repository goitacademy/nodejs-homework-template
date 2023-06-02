const express = require('express');

const ctrl = require("../../controllers/contacts-ctrls");

const isValidId  = require("../../middleware");

const router = express.Router();


router.get("/", ctrl.getAllContacts);

router.get("/:id",isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:id", isValidId, ctrl.removeContactById);

router.put("/:id", isValidId, ctrl.updateContactById);

router.patch("/:id/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;
