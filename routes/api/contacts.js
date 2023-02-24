const express = require("express");
const contactsController = require("../../controllers/contacts");
const {
  controllerExceptionWrapper,
} = require("../../helpers/controller-exception-wrapper");
const { validateBody } = require("../../middlewares");
const {
  addContactSchema,
} = require("../../helpers/schemas/add-contact.schema");

const router = express.Router();

router.get("/", controllerExceptionWrapper(contactsController.getAll));
router.get("/:id", controllerExceptionWrapper(contactsController.getById));
router.post(
  "/",
  validateBody(addContactSchema),
  controllerExceptionWrapper(contactsController.add)
);
router.put(
  "/:id",
  validateBody(addContactSchema),
  controllerExceptionWrapper(contactsController.updateById)
);
router.delete(
  "/:id",
  controllerExceptionWrapper(contactsController.deleteById)
);
router.patch(
  "/:id/favorite",
  controllerExceptionWrapper(contactsController.updateContactFavorite)
);

module.exports = router;
