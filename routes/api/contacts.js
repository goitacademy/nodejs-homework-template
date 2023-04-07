const express = require("express");

const {
  getAllContacts,
  // updateStatusContact,
  // getById,
  add,
  // update,
  // remove,
} = require("../../controllers/contactsControllers");

// const {
//   validateAddContact,
//   validateUpdContact,
// } = require("../../validators/contactsValidators");

const router = express.Router();

router.get("/", getAllContacts);
// router.patch("/:contactId/favorite", updateStatusContact);
router.post("/", add);
// router.get("/:contactId", getById);
// router.post("/", validateAddContact, add);
// router.put("/:contactId", validateUpdContact, update);
// router.delete("/:contactId", remove);

module.exports = router;
