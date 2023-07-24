const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const { errorHandler } = require("../../helpers");
const { contactSchema } = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contacts");
const booksController = require("../../controllers/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.get("/", controllerWrapper(booksController.listAll));

router.get("/:contactId", controllerWrapper(booksController.getById));

router.post(
  "/",
  validateBody(schema.contactSchema),
  controllerWrapper(booksController.add)
);

router.delete("/:contactId", controllerWrapper(booksController.removeById));

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  controllerWrapper(booksController.updateById)
);

module.exports = router;
