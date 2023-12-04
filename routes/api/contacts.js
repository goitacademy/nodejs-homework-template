const express = require("express");

const router = express.Router();

const {
  getById,
  getAll,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { addSchema } = require("../../schemas");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(addSchema), add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateBody(addSchema), updateById);

module.exports = router;
