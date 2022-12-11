const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { newContactSchema } = require("../../schemas");

const { controllerWrapper } = require("../../helpers");

router.get("/", controllerWrapper(contacts.getAll));

router.get("/:contactId", controllerWrapper(contacts.getById));

router.post(
  "/",
  validateBody(newContactSchema),
  controllerWrapper(contacts.create)
);

router.delete("/:contactId", controllerWrapper(contacts.deleteById));

router.put(
  "/:contactId",
  validateBody(newContactSchema),
  controllerWrapper(contacts.updateById)
);

module.exports = router;
