const express = require("express");

const router = express.Router();

const validation = require("../../middlewares/validation");
// const contactsOperations = require("../../models/contacts");
const {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusById,
  deleteContactById,
} = require("../../controllers/contactControllers");

const { joiSchema, favoriteSchema } = require("../../schemas/schemas");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", validation(joiSchema), addContact);

router.put("/:contactId", validation(joiSchema), updateContactById);

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  updateStatusById
);

router.delete("/:contactId", deleteContactById);

module.exports = router;
