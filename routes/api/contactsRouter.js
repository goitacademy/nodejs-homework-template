const express = require("express");

const { contactsControllers: cntr } = require("../../controllers");
const { validation, cntrlWrap } = require("../../middlewars");
const { contactsSchema } = require("../../schemas");

const contactsRouter = express.Router();

contactsRouter.get("/", cntrlWrap(cntr.getAll));

contactsRouter.get("/:contactId", cntrlWrap(cntr.getById));

contactsRouter.post("/", validation(contactsSchema), cntrlWrap(cntr.add));

contactsRouter.delete("/:contactId", cntrlWrap(cntr.remove));

contactsRouter.put(
  "/:contactId",
  validation(contactsSchema),
  cntrlWrap(cntr.update)
);

module.exports = contactsRouter;
