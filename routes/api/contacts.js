const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/");
const { addShema, updateFavoriteSchema } = require("../../models/contact");
const validateBody = require("../../validateBody");
// const { validateBody } = require("../../middlewares");

router.get("/", ctrlContact.get);

router.get("/:contactId", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.put("/:contactId", validateBody(addShema), ctrlContact.update);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  ctrlContact.updateStatusContact
);

router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
