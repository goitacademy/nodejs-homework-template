const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getById,
  add,
  updateContactById,
  delContactById,
  updateStatusContact,
} = require("../../controllers/contacts");

const { Contact } = require("../../models");

const { validation } = require("../../middlewares");

const validationMiddleware = validation(Contact);

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", validationMiddleware, add);

router.delete("/:contactId", delContactById);

router.patch("/:contactId", validationMiddleware, updateContactById);

router.patch("/:contactId/favorite", validationMiddleware, updateStatusContact);

module.exports = router;
