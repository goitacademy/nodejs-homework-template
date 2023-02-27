// const express = require("express");

// const router = express.Router();

// const { contactsController } = require("../../controllers");

// const { isValidId } = require("../../middlewares");

// router.get("/", contactsController.listContacts);

// router.get("/:id", isValidId, contactsController.getContactById);

// router.post("/", contactsController.addContact);

// router.delete("/:id", isValidId, contactsController.removeContact);

// router.put("/:id", isValidId, contactsController.updateContact);

// router.patch("/:id/favorite", isValidId, contactsController.updateStatusContact);

// module.exports = router;

///////////////////////////////////

const express = require("express");

const contactsRouter = express.Router();

const { contactsController } = require("../../controllers");

const { isValidId } = require("../../middlewares");

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post("/", contactsController.addContact);

contactsRouter.delete("/:id", isValidId, contactsController.removeContact);

contactsRouter.put("/:id", isValidId, contactsController.updateContact);

contactsRouter.patch("/:id/favorite", isValidId, contactsController.updateStatusContact);

module.exports = contactsRouter;