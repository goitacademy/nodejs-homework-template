const express = require("express");
const {
  getAllContacts,
  getById,
  add,
  deleteById,
  update,
} = require("../../controllers/contacts");

const validateBody = require("../../middleware/validateBody");
const { schema } = require("../../schema/schema");

const router = express.Router();

router.get("/", getAllContacts());

router.get("/:contactId", getById());

router.post("/", validateBody(schema), add());

router.delete("/:contactId", deleteById());

router.put("/:contactId", validateBody(schema), update());

module.exports = router;
