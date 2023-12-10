const express = require("express");
const {
  getAllContacts,
  getById,
  add,
  deleteById,
  update,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middleware/validateBody");
const { schema } = require("../../schema/schema");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getById);

router.post("/", validateBody(schema), add);

router.delete("/:id", deleteById);

router.put("/:id", validateBody(schema), update);

module.exports = router;
