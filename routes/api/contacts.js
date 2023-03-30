const express = require('express');
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById
} = require("../../controllers/contacts");
const validateBody = require('../../utils/validateBody')
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post('/', validateBody(addSchema), add)

router.delete("/:id", deleteById);

router.put("/:id", validateBody(addSchema), updateById);

module.exports = router
