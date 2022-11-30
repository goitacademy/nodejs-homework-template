const express = require("express");

const {
  add,
  remove,
  update,
  getAll,
  getById,
} = require("../../controllers/contacts");
const { addContactSchema, editContactSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");
const validate = require("../../middleware");

const router = express.Router();

router.get("/", controllerWrapper(getAll));

router.get("/:contactId", controllerWrapper(getById));

router.post("/", validate(addContactSchema), controllerWrapper(add));

router.delete("/:contactId", controllerWrapper(remove));

router.put(
  "/:contactId",
  validate(editContactSchema),
  controllerWrapper(update)
);

module.exports = router;
