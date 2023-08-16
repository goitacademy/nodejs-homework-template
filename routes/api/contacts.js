const express = require("express");
const {
  getAll,
  getById,
  createContact,
  deleteContact,
  rewriteContact,
} = require("../../controllers/contacts");
const { validationBody } = require("../../middlewares/validationBody");
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validationBody(addSchema), createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validationBody(addSchema), rewriteContact);

module.exports = router;
