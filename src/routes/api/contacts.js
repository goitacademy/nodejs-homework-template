const express = require("express");

const {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
} = require("../../controllers/index");

const { contactSchema } = require("../../schemas/index");
const { validation } = require("../../middlewares/index");
const router = express.Router();

const validateMiddleware = validation(contactSchema);

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateMiddleware, addById);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateMiddleware, updateById);

module.exports = router;
