const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
} = require("../controller/index");
const { validateRequest } = require("../middlewares/validateRequest");
const { schemaCreate, schemaUpdate } = require("../service/schemas/contact");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:id", getContactByIdController);

router.post("/", validateRequest(schemaCreate), addContactController);

router.put("/:id", validateRequest(schemaCreate), updateContactController);

router.delete("/:id", removeContactController);

router.patch(
  "/:id/favourite",
  validateRequest(schemaUpdate),
  updateStatusContactController
);

module.exports = router;
