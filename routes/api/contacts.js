const express = require("express");

const { validateBody } = require("../../middlewares/validateBody");
const { addSchema, updateSchema } = require("../../schemas/contacts");
const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(addSchema), add);

router.put("/:contactId",validateBody(updateSchema), updateById);

router.delete("/:contactId", deleteById);

module.exports = router;
