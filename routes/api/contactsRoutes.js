const express = require("express");

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");
const { checkContactById } = require("../../middlewares/contactsMidlewares");

const router = express.Router();

// router.get("/", listContacts);
// router.post("/", addContact);
// router.get("/:id", checkContactById, getContactById);
// router.delete("/:id", checkContactById, removeContact);
// router.patch("/:id", checkContactById, updateContact);

router.route("/").post(addContact).get(listContacts);

router.use("/:id", checkContactById);
router
  .route("/:id")
  .get(getContactById)
  .patch(updateContact)
  .delete(removeContact);

module.exports = router;
