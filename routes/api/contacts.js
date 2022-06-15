const express = require("express");
const router = express.Router();
const {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
} = require("../../controllers/contactsControllers");

router
  .get("/", getAll)
  .get("/:contactId", getOneById)
  .post("/", postNew)
  .delete("/:contactId", deleteById)
  .put("/:contactId", putById);

module.exports = router;
