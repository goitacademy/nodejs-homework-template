const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContById,
  addCont,
  deleteCont,
  updateCont,
  updateFavorite,
} = require("../../controllers/controllers");
const {
  addContValidation,
  updateContValidation,
} = require("../../middleware/middleware");
const tryCatch = require("../../utils/try-catch.utils");

router
  .get("/", getContacts)
  .get("/:contactId", tryCatch(getContById))
  .post("/", addContValidation, addCont)
  .delete("/:contactId", deleteCont)
  .put("/:contactId", updateContValidation, tryCatch(updateCont))
  .patch("/:contactId", updateContValidation, tryCatch(updateFavorite));

module.exports = router;
