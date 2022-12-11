const express = require("express");

const Contact = require("../../models/Contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");
const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares");
const schemas = require("../../schemas");
const router = express.Router();

router.get(
  "/",
  middlewares.authenticate,
  controllerWrapper(controllers.getAll)
);

router.get(
  "/:id",
  middlewares.authenticate,
  controllerWrapper(controllers.getById)
);

router.post(
  "/",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.add)
);

router.delete(
  "/:id",
  middlewares.authenticate,
  controllerWrapper(controllers.removeById)
);

router.put(
  "/:id",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.updateById)
);

router.patch(
  "/:id/favorite",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.updateStatusContactSchema),
  controllerWrapper(controllers.updateStatusContact)
);

module.exports = router;
