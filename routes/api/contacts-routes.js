const express = require("express");
const router = express.Router();
const contactControllers = require("../../controllers/contacts-controllers");
const authentificate = require("../../middlewares/authentificate");

const { validateAddContact, validateBody } = require("../../utils/validateBody");

const { schemas } = require("../../models/contact");

const isValiId = require("../../middlewares/isValidId");

/**
  Routes ----------------------------------------------------------------------
*/

router.use(authentificate);

router.get("/", contactControllers.getAllContacts);

router.get("/:contactId", isValiId, contactControllers.getOneContact);

router.post("/", validateAddContact(schemas.addContactSchema), contactControllers.addNewContact);

router.delete("/:contactId", isValiId, contactControllers.deleteContact);

router.put("/:contactId", isValiId, validateBody(schemas.editContactSchema), contactControllers.changeContact);

router.patch(
    "/:contactId/favorite",
    isValiId,
    validateBody(schemas.editFavoriteSchema),
    contactControllers.changeFavorite
);

module.exports = router;
