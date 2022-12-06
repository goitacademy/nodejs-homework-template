const express = require("express");

const Contact = require("../../models/Contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");
const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares");
const schemas = require("../../schemas");
const router = express.Router();

router.get("/", controllerWrapper(controllers.getAll));

router.get("/:id", controllerWrapper(controllers.getById));

router.post(
  "/",
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.add)
);

router.delete("/:id", controllerWrapper(controllers.removeById));

router.put(
  "/:id",
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.updateById)
);

router.patch(
  "/:id/favorite",
  middlewares.validateBody(schemas.contact.updateStatusContactSchema),
  controllerWrapper(controllers.updateStatusContact)
);

module.exports = router;
