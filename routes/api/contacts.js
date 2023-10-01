const express = require("express");

const { getAll, getById, add, remove, update } = require("../routes.js");
const {
  addValidation,
  updateValidation,
} = require("../../middlewares/validation.js");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addValidation, add);

router.delete("/:contactId", remove);

router.put("/:contactId", updateValidation, update);

module.exports = router;
