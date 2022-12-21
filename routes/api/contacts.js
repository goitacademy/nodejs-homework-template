const express = require("express");
const ctrl = require("../../controllers/contacts");
// const { validateBody } = require("../../middlewares/Validator")
// const schemas = require("../../schemas/contacts")

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContact);

// router.post("/", validateBody(schemas.addSchema), ctrl.postContact);
router.post("/", ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateContact);

module.exports = router;
