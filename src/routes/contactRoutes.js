const express = require("express");
const {
  listContactsControler,
  getContactByIdControler,
  addContactControler,
  removeContactControler,
  updateContactControler,
} = require("../controllers/contactsControllers");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddelwares } = require("../middelewares/authMiddeleares");
const {
  postContactValidation,
  putContactValidation,
} = require("../middelewares/validationContacts");

const router = express.Router();
router.use(authMiddelwares);
router.get("/", asyncWrapper(listContactsControler));

router.get("/:id", asyncWrapper(getContactByIdControler));

router.post("/", postContactValidation, asyncWrapper(addContactControler));

router.delete("/:id", asyncWrapper(removeContactControler));

router.put("/:id", putContactValidation, asyncWrapper(updateContactControler));

module.exports = router;
