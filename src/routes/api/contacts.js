const express = require("express");
const { errorHandler } = require("../../helpers/errorHandler");
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
  errorHandler(getUserContacts)
);

router.get(
  "/:contactId",
  authMW,
  validation(paramsContactSchema, "params"),
  errorHandler(getUserContactById)
);

router.post(
  "/",
  authMW,
  validation(addContactSchema),
  errorHandler(postContact)
);

router.delete(
  "/:contactId",
  authMW,
  validation(paramsContactSchema, "params"),
  errorHandler(deletContact)
);

router.put(
  "/:contactId",
  authMW,
  validation(paramsContactSchema, "params"),
  validation(putContactSchema),
  errorHandler(updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authMW,
  validation(paramsContactSchema, "params"),
  validation(patchFavoriteContactSchema),
  errorHandler(updateContactStatusById)
);

module.exports = router;
