const express = require("express");

const { ctrlhWrapper} = require("../../helpers/helpers");
const {
  getListContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contacts");
const { validation } = require("../../middlewares/validation");
const { contactSchema, contactUpdateStatusSchema }  = require("../../schemas/schema");

const router = express.Router();

router.get("/", ctrlhWrapper(getListContacts));
router.get("/:id", ctrlhWrapper(getContact));
router.post("/", validation(contactSchema), ctrlhWrapper(createContact));
router.delete("/:id", ctrlhWrapper(deleteContact));
router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlhWrapper(updateContactById)
);
router.patch(
  "/:contactId/favorite",
  validation(contactUpdateStatusSchema),
  ctrlhWrapper(updateStatusContact)
);

module.exports = router;
