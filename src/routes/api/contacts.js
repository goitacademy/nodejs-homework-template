const express = require("express");

const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  get,
  getById,
  remove,
  add,
  update,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", addContactValidation, add);

router.delete("/:contactId", remove);

router.put("/:contactId", updateContactValidation, update);

module.exports = router;
