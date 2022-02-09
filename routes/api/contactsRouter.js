const { Router } = require("express");
const router = Router();

// const { asyncWrapper } = require("../../src/helpers/apiHelpers");
const { authenticate } = require("../../src/middlewares");

// const contactsControllers = require("../../controllers");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
} = require("../../src/controllers/contactsController");

// получить все
// app.use("/api/contacts/...
router.get("/", authenticate, getContactsController);

// получить по id
// app.use("/api/contacts/id...
router.get("/:contactId", authenticate, getContactByIdController);
// router.get("/", asyncWrapper(getContactByIdController));

// добавить
router.post("/", authenticate, addContactController);

// обновить
router.put("/:contactId", authenticate, changeContactController);

// обновить частично
router.patch("/:contactId/favorite", authenticate, patchContactController);

// удалить
router.delete("/:contactId", authenticate, deleteContactController);

module.exports = { contactsRouter: router };
