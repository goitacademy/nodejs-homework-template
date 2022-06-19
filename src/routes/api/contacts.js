const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../middlewares/helpers/apiHelpers");

const {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
} = require("../../controllers/contactsControllers");

const {
  addFieldValidation,
  updateFieldValidation,
} = require("../../middlewares/validation");

router
  .get("/", asyncWrapper(getAll))
  .get("/:contactId", asyncWrapper(getOneById))
  .post("/", addFieldValidation, asyncWrapper(postNew))
  .delete("/:contactId", asyncWrapper(deleteById))
  .put("/:contactId", updateFieldValidation, asyncWrapper(putById));

module.exports = router;
