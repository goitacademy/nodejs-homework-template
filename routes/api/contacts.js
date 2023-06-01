const express = require("express");

const contactCtrl = require("../../controllers/contactControllers");
const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../../middlwares/bodyValidation");
const { addSchema, toggleFavoriteSchema } = require("../../models/contact");
const isValidId = require("../../middlwares/isValidId");

const router = express.Router();

router.get("/", contactCtrl.getAllContacts);

router.get("/:id", isValidId, contactCtrl.getContact);

router.post("/", postValidation(addSchema), contactCtrl.postContact);

router.delete("/:id", isValidId, contactCtrl.deleteContact);

router.put(
  "/:id",
  isValidId,
  putValidation(addSchema),
  contactCtrl.changeContactData
);

router.patch(
  "/:id/favorite",
  isValidId,
  patchValidation(toggleFavoriteSchema),
  contactCtrl.updateStatusContact
);

module.exports = router;
