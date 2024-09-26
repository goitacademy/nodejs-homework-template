const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteContact,
  update,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(schemas.addSchema), update);

module.exports = router;
