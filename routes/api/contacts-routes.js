const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const router = express.Router();

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteContactById);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContactById);
router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById)

module.exports = router;
