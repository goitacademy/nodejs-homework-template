const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const  ctrl  = require("../../controllers/contacts");
const { validation, authenticate, isValidId } = require("../../middlewares");
const { contactSchema, contactUpdateStatusSchema }  = require("../../schemas/contactSchema");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getListContacts));
router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getContact));
router.post("/", authenticate, validation(contactSchema), ctrlWrapper(ctrl.createContact));
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteContact));
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContactById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(contactUpdateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
