const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { validationBody } = require("../../middlewars");

const schemas = require("../../shemas/contactShema");

const router = express.Router();

router.get("/", controllerWrapper(controller.listContacts));

router.get("/:id", controllerWrapper(controller.getContactById));

router.post(
  "/",
  validationBody(schemas.add),
  controllerWrapper(controller.addContact)
);

router.delete("/:id", controllerWrapper(controller.removeContact));

router.put(
  "/:id",
  validationBody(schemas.add),
  controllerWrapper(controller.updateContactById)
);

module.exports = router;
