const express = require("express");
const {
  get,
  getById,
  add,
  remove,
  change,
} = require("../../controllers/contactsController");
const {
  postContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", postContactValidation, add);

router.delete("/:contactId", remove);

router.put("/:contactId", putContactValidation, change);

module.exports = router;
