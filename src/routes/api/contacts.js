const express = require("express");
const router = express.Router();
const {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
} = require("../../controllers/contactsControllers");
const { fieldValidation } = require("../../middlewares/validation");

router
  .get("/", getAll)
  .get("/:contactId", getOneById)
  .post("/", fieldValidation, postNew)
  .delete("/:contactId", deleteById)
  .put("/:contactId", fieldValidation, putById);

module.exports = router;
