const express = require("express");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const { addContactSchema } = require("../../schemas/contacts");
const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatus,
} = require("../../controllers/contacts");

router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(createContact)
);
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put("/:contactId", tryCatchWrapper(changeContact));
router.patch("/:contactId/favorite", tryCatchWrapper(changeStatus));

module.exports = router;
