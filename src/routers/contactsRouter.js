const express = require("express");
const { asyncWrapper } = require("../helpers/apiHelpers");

const router = express.Router();
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require("../controllers/contactsController");

const { postValidation, putValidation } = require("../middlewares/validation");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsController));
router.get("/:id", asyncWrapper(getContactByIdController));
router.post("/", postValidation, asyncWrapper(addContactController));
router.delete("/:id", asyncWrapper(removeContactController));
router.put("/:id", putValidation, asyncWrapper(updateContactController));

module.exports = router;
