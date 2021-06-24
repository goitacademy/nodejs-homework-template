const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  patchContactById,
} = require("../../../controllers/contactController");

const {
  addValidationContact,
  updateValidationContact,
  validationUpdateContactFavoriteSatus,
  validationObjectId,
  validationQueryContact,
} = require("./validationContact");

const errorHandler = require("../../../helpers/errorHandlerWrapper");
const guard = require("../../../helpers/guard");

router.get("/", guard, validationQueryContact, getAllContacts);

router.post("/", guard, addValidationContact, errorHandler(createContact));

router.get("/:contactId", guard, validationObjectId, getContactById);

router.delete("/:contactId", guard, validationObjectId, deleteContact);

router.put(
  "/:contactId",
  guard,
  validationObjectId,
  updateValidationContact,
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  guard,
  validationObjectId,
  validationUpdateContactFavoriteSatus,
  patchContactById
);

module.exports = router;
