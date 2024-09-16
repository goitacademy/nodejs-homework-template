const { Router } = require("express");
const router = Router();
const {
  listContacts,
  removeContact,
  addContact,
  getContactById,
  updateContact,
  updateContactsFavorite,
} = require("../../controllers/contactControllers");
router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);
router.put(
  "/:contactId/favorite",
  updateContactsFavorite
);
module.exports = router;
