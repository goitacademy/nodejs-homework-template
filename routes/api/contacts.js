const express = require("express");
const router = express.Router();
const { joyValidation } = require("../../middleware");
const { contactSchema } = require("../../schemas");
const joyValidate = joyValidation(contactSchema);

const {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
} = require("../../controllers/index");

router
  .get("/", getAll)
  .get("/:contactId", getById)
  .post("/", joyValidate, addById)
  .delete("/:contactId", deleteById)
  .put("/:contactId", joyValidate, updateById);

module.exports = router;
