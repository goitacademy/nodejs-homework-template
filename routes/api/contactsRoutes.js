const express = require("express");

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contactsController");
const {
  checkContactById,
  checkCreateContactById,
  checkUpdateContactById,
  checkUpdateContactFavorite,
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
  .put(checkUpdateContactById, updateContact)
  .delete(removeContact);
router
  .route("/:id/favorite")
  .patch(checkUpdateContactFavorite, updateContactFavorite);

module.exports = router;
