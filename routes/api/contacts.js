const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contacts.controller");

const { validateBody } = require("../../middlewares/validation");
const {
  contactValidationSchema,
} = require("../../schemas/contactValidationSchema");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));
router.get("/:id", tryCatchWrapper(getContact));
router.post(
  "/",
  validateBody(contactValidationSchema),
  tryCatchWrapper(createContact)
);
router.delete("/:id", tryCatchWrapper(deleteContact));
router.put(
  "/:id",
  validateBody(contactValidationSchema),
  tryCatchWrapper(changeContact)
);

module.exports = router;
