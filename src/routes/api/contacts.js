const express = require("express");

const {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
} = require("../../controllers/index");

// const { contactSchema } = require("../../schemas/contact");
const router = express.Router();

// const validateMiddleware = validation(contactSchema);

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addById);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

module.exports = router;
