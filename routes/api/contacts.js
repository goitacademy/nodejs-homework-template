const express = require("express");
const ctrl = require("../../controllers/contacts")
const { contactSchemaPost,
    contactSchemaPut
} = require("../../schemasValidation")
const {validateBody, isValidId, authenticate} = require("../../middlewares")

const router = express.Router();


router.get("/", authenticate, ctrl.getAllContactsList);

router.get("/:id", authenticate, isValidId, ctrl.getContactsById);

router.post("/", authenticate, validateBody(contactSchemaPost), ctrl.addContact );

router.delete("/:id",authenticate, isValidId, ctrl.deleteContact);

router.put("/:id", authenticate,  isValidId, validateBody(contactSchemaPut), ctrl.updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(contactSchemaPut), ctrl.favoriteContact);

module.exports = router;
