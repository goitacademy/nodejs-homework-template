const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(schemas.validateData), add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateBody(schemas.validateData), updateById);

module.exports = router;
