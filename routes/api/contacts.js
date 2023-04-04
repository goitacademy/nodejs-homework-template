const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { validateBy } = require("../../middlewars");
const validContact = require("../../schemas/contscts");

router.get("/", controller.getAll);

router.get("/:contactId", controller.getById);

router.post("/", validateBy(validContact.primarySchema), controller.add);

router.delete("/:contactId", controller.deleteById);

router.put(
  "/:contactId",
  validateBy(validContact.primarySchema),
  controller.putById
);

router.patch(
  "/:contactId",
  validateBy(validContact.secondarySchema),
  controller.putchById
);

module.exports = router;
