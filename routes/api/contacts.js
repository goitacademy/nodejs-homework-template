const express = require("express");
const router = express.Router();

const {
  getAll,
  getContactById,
  createContact,
  deleteContactById,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contactController");
const {
  isBodyEmpty,
  validationFields,
  validationFavoriteField,
  isIdValid,
  isIdExist,
} = require("../../middlewares/contactMiddlewares");
const { contactWrapper } = require("../../wrappers/contactWrapper");

router.get("/", contactWrapper(getAll));
router.get("/:contactId", isIdValid, isIdExist, contactWrapper(getContactById));
router.post("/", isBodyEmpty, validationFields, contactWrapper(createContact));
router.delete(
  "/:contactId",
  isIdValid,
  isIdExist,
  contactWrapper(deleteContactById)
);
router.put(
  "/:contactId",
  isBodyEmpty,
  isIdValid,
  isIdExist,
  validationFields,
  contactWrapper(changeContact)
);
router.patch(
  "/:contactId/favorite",
  isIdValid,
  isIdExist,
  validationFavoriteField,
  contactWrapper(updateStatusContact)
);

module.exports = router;
