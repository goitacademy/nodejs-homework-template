const express = require("express");
const ctrl = require("../../controllers/contacts");
const {authentificate}  = require('../../middlewares');

const router = express.Router();

router.get("/", authentificate, ctrl.getAll);

router.get("/:contactId", authentificate, ctrl.getById);

router.post("/", authentificate, ctrl.addContact);

router.delete("/:contactId", authentificate, ctrl.deleteContact);

router.put("/:contactId", authentificate, ctrl.updateContact);

router.patch("/:contactId/favorite", authentificate, ctrl.updateStatusContact);


module.exports = router;
