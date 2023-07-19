const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  toggleFavorite,
} = require("../../controllers/contactsControllers");
const validateSchema = require("../../middlewares/validationMiddleware");
const { createContactSchema, updateContactSchema } = require("./validators");

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", validateSchema(createContactSchema), createContact);
router.delete("/:id", deleteContact);
router.put("/:id", validateSchema(updateContactSchema), updateContact);
router.patch("/:contactId/favorite", toggleFavorite);

module.exports = router;
