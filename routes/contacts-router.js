const express = require("express");
const {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controlers/contactControlers");
const router = express.Router();
const { isEmptyBody, isValidId, isEmptyFav } = require("../middlewares/index");
const { validateBody } = require("../decorators/index");
const { schema, schemaFav } = require("../db/contacts-schema");

const contactAddValidate = validateBody(schema);
const contactUpdateFavValidate = validateBody(schemaFav);

router.get("/", getAllContacts);

router.get("/:id", isValidId, getOneContact);

router.post("/", isEmptyBody, contactAddValidate, createContact);

router.put("/:id", isValidId, isEmptyBody, contactAddValidate, updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyFav,
  contactUpdateFavValidate,
  updateContact
);

router.delete("/:id", isValidId, deleteContact);

module.exports = { contactRouter: router };
