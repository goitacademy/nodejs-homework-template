const express = require("express");

const router = express.Router();

const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getByid);

router.post("/", validation(contactSchema), ctrl.addPost);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validation(contactSchema), ctrl.update);

module.exports = router;
