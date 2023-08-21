const express = require("express");
const ctrl = require("../../controllers/contacts")
const { contactSchemaPost,
    contactSchemaPut
} = require("../../schemasValidation")
const {validateBody, isValidId} = require("../../middlewares")

const router = express.Router();


router.get("/", ctrl.getAllContactsList);

router.get("/:id",isValidId, ctrl.getContactsById);

router.post("/", validateBody(contactSchemaPost), ctrl.addContact );

router.delete("/:id",isValidId, ctrl.deleteContact);

router.put("/:id", isValidId, validateBody(contactSchemaPut), ctrl.updateContact);

router.patch("/:id/favorite",isValidId, validateBody(contactSchemaPut), ctrl.favoriteContact);

module.exports = router;
