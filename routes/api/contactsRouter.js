const express = require("express");

const { contactsControllers: cntr } = require("../../controllers");
const { validation, isValidId, auth } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");
const { joiSchema, joiSchemaFavorite } = require("../../models/contact");

const contactsRouter = express.Router();

contactsRouter.get("/", auth, cntrlWrap(cntr.getAll));

contactsRouter.get("/:id", auth, isValidId, cntrlWrap(cntr.getById));

contactsRouter.post("/", auth, validation(joiSchema), cntrlWrap(cntr.add));

contactsRouter.delete("/:id", auth, isValidId, cntrlWrap(cntr.remove));

contactsRouter.put(
  "/:id",
  auth,
  isValidId,
  validation(joiSchema),
  cntrlWrap(cntr.update)
);

contactsRouter.patch(
  "/:id/favorite",
  auth,
  validation(joiSchemaFavorite),
  cntrlWrap(cntr.updateFavorite)
);

module.exports = contactsRouter;
