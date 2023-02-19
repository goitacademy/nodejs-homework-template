const express = require("express");

const { ctrlhWrapper} = require("../../helpers/helpers");
const {
  getListContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
} = require("../../controllers/controllers");
const { validation } = require("../../middlewares/validation");
const  contactSchema  = require("../../schemas/schema");

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

module.exports = router;
