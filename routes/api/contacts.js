const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  removeById,
  update,
} = require("../../controllers");

const { validateBody, checkBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", checkBody, validateBody(addSchema), add);

router.delete("/:id", removeById);

router.put("/:id", checkBody, validateBody(addSchema), update);

module.exports = router;
