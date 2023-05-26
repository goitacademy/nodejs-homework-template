const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts");

const {validateBody, isValidId, validateFavourite} = require("../../middlewares");

const {schemas} = require("../../models/contact")

router.get("/", controller.getAllContacts);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", validateBody(schemas.addSchema), controller.postContact);

router.delete("/:contactId", isValidId, controller.deleteContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), controller.putContact);

router.patch("/:contactId/favourite", isValidId, validateFavourite(schemas.updateFavouriteSchema), controller.updateFavourite)

module.exports = router;
