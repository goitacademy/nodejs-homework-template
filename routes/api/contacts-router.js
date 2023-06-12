const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts-controller");

const { validateBody } = require("../../decorators");

const contactSchemas = require("../../schemas/contactSchema");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactSchemas), add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

module.exports = router;
