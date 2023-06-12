const express = require("express");
const router = express.Router();

const {
  getAll,
  getContactById,
  createContact,
  deleteContactById,
  changeContact,
} = require("../../controllers/contactController");
const {
  isBodyEmpty,
  validationFields,
  isIdExist,
} = require("../../middlewares/contactMiddlewares");
const { contactWrapper } = require("../../wrappers/contactWrapper");

router.get("/", contactWrapper(getAll));
router.get("/:contactId", isIdExist, contactWrapper(getContactById));
router.post("/", isBodyEmpty, validationFields, contactWrapper(createContact));
router.delete("/:contactId", isIdExist, contactWrapper(deleteContactById));
router.put(
  "/:contactId",
  isBodyEmpty,
  isIdExist,
  contactWrapper(changeContact)
);

module.exports = router;
