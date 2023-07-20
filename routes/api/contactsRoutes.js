const express = require("express");

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");
const {
  checkContactById,
  checkCreateContactById,
  // checkUpdateContactById,
} = require("../../middlewares/contactsMidlewares");

const router = express.Router();

// router.get("/", listContacts);
// router.post("/", addContact);
// router.get("/:id", checkContactById, getContactById);
// router.delete("/:id", checkContactById, removeContact);
// router.patch("/:id", checkContactById, updateContact);

router.route("/").post(checkCreateContactById, addContact).get(listContacts);

router.use("/:id", checkContactById);
router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(removeContact);
router.route("/:id/favorite").patch(updateContact);

module.exports = router;
