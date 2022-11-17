const express = require("express");
const {
  getContactList,
  addContactById,
  deleteContactById,
  getContactsById,
  updateContactById,
} = require("../../controllers/postController");
const {
  addPostValidation,
  putUpdateValidation,
} = require("../../middlewares/validationMiddlewares");

const router = express.Router();

router.get("/", getContactList);

router.get("/:contactId", getContactsById);

router.post("/", addPostValidation, addContactById);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", putUpdateValidation, updateContactById);

module.exports = router;
