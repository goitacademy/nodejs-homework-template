const express = require("express");

const {
  getUserContacts,
  getUserContactById,
  postContact,
  deletContact,
  updateContactById,
  updateContactStatusById,
} = require("../../controller/contactsController");
const {
  addContactSchema,
  putContactSchema,
  patchFavoriteContactSchema,
  paramsContactSchema,
  queryContactSchema,
} = require("../../models/contactsSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");

const router = express.Router();

router.get(
  "/",
  authMW,
  validation(queryContactSchema, "query"),
  getUserContacts
);

router.get(
  "/:contactId",
  authMW,
  validation(paramsContactSchema, "params"),
  getUserContactById
);

router.post("/", authMW, validation(addContactSchema), postContact);

router.delete(
  "/:contactId",
  authMW,
  validation(paramsContactSchema, "params"),
  deletContact
);

router.put(
  "/:contactId",
  authMW,
  validation(paramsContactSchema, "params"),
  validation(putContactSchema),
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  authMW,
  validation(paramsContactSchema, "params"),
  validation(patchFavoriteContactSchema),
  updateContactStatusById
);

module.exports = router;
