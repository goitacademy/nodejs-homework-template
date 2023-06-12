const express = require("express");
// const validateBody = require("../../middlewares/validateBody");
// const addSchema = require("../../middlewares/validateSchema");

const router = express.Router();

const ctrl = require("./contacts");

router.get("/", ctrl.listContacts);

// router.get("/:id", ctrl.getContactById);

// router.post("/", validateBody(addSchema), ctrl.addContact);

// router.delete("/:id", ctrl.removeContact);

// router.put("/:id", validateBody(addSchema), ctrl.updateContact);

module.exports = router;
