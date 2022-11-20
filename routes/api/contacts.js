const express = require("express");
const {
  getContactList,
  addContactById,
  deleteContactById,
  getContactsById,
  updateContactById,
} = require("../../controllers/controller");
const asyncWrapper = require("../../helpers/apiHelpers");
const {
  addPostValidation,
  putUpdateValidation,
} = require("../../middlewares/validationMiddlewares");

const router = express.Router();

router.get("/", asyncWrapper(getContactList));

router.get("/:contactId", asyncWrapper(getContactsById));

router.post("/", addPostValidation, asyncWrapper(addContactById));

router.delete("/:contactId", asyncWrapper(deleteContactById));

router.put("/:contactId", putUpdateValidation, asyncWrapper(updateContactById));

router.patch("/:contactId/favorite");

module.exports = router;
