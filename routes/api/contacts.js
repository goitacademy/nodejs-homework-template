const express = require("express");
const controllers = require("../../controllers");
const { addSchema, updateSchema } = require("../../schemas");
const { validateBody, isBody } = require("../../middlewares");
const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getById);

router.post("/", validateBody(addSchema), controllers.addContact);

router.delete("/:contactId", controllers.deleteContact);

router.put(
  "/:contactId",
  isBody,
  validateBody(updateSchema),
  controllers.updateContact
);

module.exports = router;
