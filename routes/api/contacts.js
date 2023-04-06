const express = require("express");


const ctrl = require("../../controllers/contacts-controllers");
const {validateBody} = require("../../utils");
const {schemas} = require("../../models/contact");

const router = express.Router();



router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.addSchema),ctrl.updateContact);

module.exports = router;
