const express = require("express");
const router = express.Router();

const {
  postContactValidation,
  putContactValidation,
  patchFavoriteValidation,
} = require("../../middlewares/userMiddlevares");

const {
  getContacts,
  addContact,
  deleteUserById,
  getContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/userControllers");

router.get("/", getContacts);
router.post("/", postContactValidation, addContact);
router.delete("/:contactId", deleteUserById);
router.put("/:contactId", putContactValidation, updateContactById);
router.get("/:contactId", getContactById);
router.patch(
  "/:contactId/favorite",
  patchFavoriteValidation,
  updateStatusContact
);

module.exports = router;
