const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/controllers");

router.route("/").get(getAllContacts).post(createContact);
router
  .route("/:contactId")
  .get(getContactById)
  .delete(deleteContact)
  .patch(updateContact);

module.exports = router;
