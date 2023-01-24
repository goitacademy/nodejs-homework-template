const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController.js");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas/contactSchema.js");

router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post("/", validateBody(contactSchema), tryCatchWrapper(postContact));
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put(
  "/:contactId",
  validateBody(contactSchema),
  tryCatchWrapper(putContact)
);
// router.patch("/:contactId/favorite", tryCatchWrapper(patchContact));

module.exports = router;
