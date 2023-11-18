const express = require("express");
const controllers = require("../../controllers/contacts");
const { validataBody } = require("../../middlewars");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validataBody(schemas.addSchema), controllers.addContact);

router.put(
  "/:contactId",
  validataBody(schemas.addSchema),
  controllers.updateContact
);

router.delete("/:contactId", controllers.deleteContact);

module.exports = router;
