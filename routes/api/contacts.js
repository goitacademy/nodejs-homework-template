const express = require("express");

const ctrl = require("../../controllers/contacts");
// const contacts = require("../../models/contacts");
// const HttpError = require("../../helpers");
// const { addSchema } = require("../../schemas/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.add);

router.put("/:contactId", ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
