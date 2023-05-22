const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  removeById,
  update,
} = require("../../controllers");

const { validateBody } = require("../../utils");
const { contactAddSchema } = require("../../schemas");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(contactAddSchema), add);

router.delete("/:id", removeById);

router.put("/:id", validateBody(contactAddSchema), update);

module.exports = router;
