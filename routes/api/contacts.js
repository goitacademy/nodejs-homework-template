const express = require("express");

const contactCtrl = require("../../controllers/contactControllers");
const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../../middlwares/bodyValidation");
const { addSchema, toggleFavoriteSchema } = require("../../models/contact");
const isValidId = require("../../middlwares/isValidId");
const inspectToken = require("../../middlwares/inspectToken");

const router = express.Router();

router.get("/", inspectToken, contactCtrl.getAllContacts);

router.get("/:id", isValidId, inspectToken, contactCtrl.getContact);

router.post(
  "/",
  inspectToken,
  postValidation(addSchema),
  contactCtrl.postContact
);

router.delete("/:id", isValidId, inspectToken, contactCtrl.deleteContact);

router.put(
  "/:id",
  isValidId,
  inspectToken,
  putValidation(addSchema),
  contactCtrl.changeContactData
);

router.patch(
  "/:id/favorite",
  isValidId,
  inspectToken,
  patchValidation(toggleFavoriteSchema),
  contactCtrl.updateStatusContact
);

module.exports = router;
