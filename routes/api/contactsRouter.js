const express = require("express");

const { contactsControllers: cntr } = require("../../controllers");
const { validation, isValidId } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");
const {
  contactSchema,
  contactSchemaFavorite,
} = require("../../models/contact");

const contactsRouter = express.Router();

contactsRouter.get("/", cntrlWrap(cntr.getAll));

contactsRouter.get("/:id", isValidId, cntrlWrap(cntr.getById));

contactsRouter.post("/", validation(contactSchema), cntrlWrap(cntr.add));

contactsRouter.delete("/:id", isValidId, cntrlWrap(cntr.remove));

contactsRouter.put(
  "/:id",
  isValidId,
  validation(contactSchema),
  cntrlWrap(cntr.update)
);

contactsRouter.patch(
  "/:id/favorite",
  validation(contactSchemaFavorite),
  cntrlWrap(cntr.updateFavorite)
);

module.exports = contactsRouter;
