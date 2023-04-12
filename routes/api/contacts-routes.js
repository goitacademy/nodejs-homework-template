const express = require("express");

//імпортуємо контроллери з окремого файлу який ми створили і винесли їх туди
const ctrl = require("../../controllers/contacts/");

const { isValidId } = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
