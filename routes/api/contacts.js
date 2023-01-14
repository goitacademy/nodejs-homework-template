const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");

const { validateBody } = require("../../middlewares/validation");
const {
  contactCreateValidationSchema,
  contactUpdateStatusValidationSchema,
} = require("../../schemas/contactValidationSchema");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));
router.get("/:id", tryCatchWrapper(getContact));
router.post(
  "/",
  validateBody(contactCreateValidationSchema),
  tryCatchWrapper(createContact)
);
router.delete("/:id", tryCatchWrapper(deleteContact));
router.put(
  "/:id",
  validateBody(contactCreateValidationSchema),
  tryCatchWrapper(changeContact)
);
router.patch(
  "/:id",
  validateBody(contactUpdateStatusValidationSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
