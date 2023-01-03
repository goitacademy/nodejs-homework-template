const express = require("express");

const router = express.Router();
// const modelMiddleware = require("/nodejs-homework-template-vm/middlewears/models");
const {
  addContactValidation,
  putContactVlidation,
  patchContactVlidation,
} = require("../../middlewears/validationMiddleware");
const { isValidId } = require("../../middlewears/validationI");
const {
  getContacts,
  addContacts,
  getContactsById,
  putContacts,
  removeContacts,
  putContactsFav,
} = require("/nodejs-homework-template-vm/contrillers/contactController");
const {
  asyncWrapper,
} = require("/nodejs-homework-template-vm/helpers/apiHelpers");
const { authMiddleware } = require("../../middlewears/authMiddleware");
router.use(authMiddleware);
router.get("/", asyncWrapper(getContacts));

router.get("/:contactId", isValidId, asyncWrapper(getContactsById));

router.post("/", addContactValidation, asyncWrapper(addContacts));

router.delete("/:contactId", isValidId, asyncWrapper(removeContacts));

router.put(
  "/:contactId",

  putContactVlidation,
  isValidId,
  asyncWrapper(putContacts)
);
router.patch(
  "/:contactId/favorite",
  patchContactVlidation,
  asyncWrapper(putContactsFav)
);
module.exports = router;
