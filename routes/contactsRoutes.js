// ========ROUTES======== //
const express = require("express");
const router = express.Router();

const {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
  checkUpdateStatus,
} = require("../middlewares/contactsMiddlewares");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
} = require("../controllers/contactsControllers");
const { protect } = require("../middlewares/usersMiddlewares");

router.use(protect);

router.get("/", listContacts);
router.post("/", checkCreateContactData, addContact);

router.use("/:contactId", checkContactId);

router.get("/:contactId", getContactById);
router.delete("/:contactId", removeContact);
router.put("/:contactId", checkUpdateContactData, updateContact);
router.patch("/:contactId/favorite", checkUpdateStatus, updateFavoriteStatus);

module.exports = router;
