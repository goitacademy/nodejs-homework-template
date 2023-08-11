const express = require("express");

const router = express.Router();
const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(schema.addSchema), add);

router.put("/:contactId", validateBody(schema.addSchema), updateById);

router.delete("/:contactId", deleteById);

module.exports = router;
