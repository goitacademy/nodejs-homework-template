const express = require("express");
const contactCtrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const contactSchemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", contactCtrl.getAll);

router.get("/:contactId", contactCtrl.getById);

router.post(
  "/",
  validateBody(contactSchemas.contactFull),
  contactCtrl.addOne
);

router.delete("/:contactId", contactCtrl.deleteById);

router.put(
  "/:contactId",
  validateBody(contactSchemas.contactFull),
  contactCtrl.updateById
);

module.exports = router;
