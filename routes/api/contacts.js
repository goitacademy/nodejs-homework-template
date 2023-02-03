const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/");
const { schemas } = require("../../models/contact");
const validateBody = require("../../validateBody");
// const { validateBody } = require("../../middlewares");

router.get("/", ctrlContact.get);

router.get("/:contactId", ctrlContact.getById);

router.post("/", validateBody(schemas.addSchema), ctrlContact.create);

router.put("/:contactId", validateBody(schemas.addSchema), ctrlContact.update);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrlContact.updateStatusContact
);

router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
