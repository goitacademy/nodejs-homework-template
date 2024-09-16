const express = require("express");

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");
const { checkContactsById } = require("../../middlewares/contactsMidlewares");

const router = express.Router();

// router.get("/", listContacts);
// router.post("/", addContact);
// router.get("/:id", checkContactsById, getContactById);
// router.delete("/:id", checkContactsById, removeContact);
// router.patch("/:id", checkContactsById, updateContact);

router.route("/").post(addContact).get(listContacts);

router.use("/:id", checkContactsById);
router
  .route("/:id")
  .get(getContactById)
  .patch(updateContact)
  .delete(removeContact);

module.exports = router;
