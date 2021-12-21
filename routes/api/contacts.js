const express = require("express");
const router = express.Router();
const { ctrl } = require("../../controllers");
const { validation } = require("../../middlewares");
const { joiContactSchema } = require("../../validations");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContact);

router.post("/", validation(joiContactSchema), ctrl.addContact);

router.put("/:id", validation(joiContactSchema), ctrl.updateContact);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
