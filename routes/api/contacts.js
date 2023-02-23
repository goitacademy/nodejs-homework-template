const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers");

const { validateBody } = require("../../middlewares");

const { addSchema } = require("../../schemas");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(addSchema), add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateBody(addSchema), updateById);

module.exports = router;
