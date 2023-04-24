const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { validationSchema, updateFavoriteSchema } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getOneContactById);

router.post("/", validateBody(validationSchema), ctrl.addNewContact);

router.put("/:contactId", isValidId, validateBody(validationSchema), ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
