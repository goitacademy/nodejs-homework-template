const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const contactsSchema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(contactsSchema, "missing required name field"),
  ctrl.create
);

router.delete("/:contactId", ctrl.remove);

router.put(
  "/:contactId",
  validateBody(contactsSchema, "missing fields"),
  ctrl.update
);

module.exports = router;
