const express = require("express");
const contactCtrl = require("../../controllers/contacts");
const { validateBody, isValid } = require("../../middlewares");
const contactSchemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", contactCtrl.getAll);

router.get("/:contactId", isValid, contactCtrl.getById);

router.post("/", validateBody(contactSchemas.contactFull), contactCtrl.addOne);

router.delete("/:contactId", isValid, contactCtrl.deleteById);

router.put(
  "/:contactId",
  isValid,
  validateBody(contactSchemas.contactFull),
  contactCtrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValid,
  validateBody(contactSchemas.contactFavorite),
  contactCtrl.updateStatusContact
);

module.exports = router;
