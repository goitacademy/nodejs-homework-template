const express = require("express");

const router = express.Router();
// const modelMiddleware = require("/nodejs-homework-template-vm/middlewears/models");
const {
  addContactValidation,
  putContactVlidation,
  patchContactVlidation,
} = require("/nodejs-homework-template-vm/middlewears/validationMiddleware");
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

router.get("/", asyncWrapper(getContacts));

router.get("/:contactId", asyncWrapper(getContactsById));

router.post("/", addContactValidation, asyncWrapper(addContacts));

router.delete("/:contactId", asyncWrapper(removeContacts));

router.put("/:contactId", putContactVlidation, asyncWrapper(putContacts));
router.patch(
  "/:contactId/favorite",
  patchContactVlidation,
  asyncWrapper(putContactsFav)
);
module.exports = router;
