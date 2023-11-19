const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const authController = require("../../controllers/authController");
const authMiddleware = require("../../middlewares/authMiddleware");

const {
  addUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../../schemas/user");

const { validateBody, isValidId } = require("../../middlewares/index");

const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts");

// Контакти
router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.post("/", validateBody(addContactSchema), add);
router.delete("/:contactId", isValidId, deleteById);
router.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

// Аутентифікація та управління користувачами
router.post(
  "/users/register",
  validateBody(addUserSchema),
  authController.register
);
router.post(
  "/users/login",
  validateBody(loginUserSchema),
  authController.login
);
router.get("/users/current", authMiddleware, authController.getCurrentUser);
router.post("/users/logout", authMiddleware, authController.logout);
router.patch(
  "/users",
  authMiddleware,
  validateBody(updateUserSchema),
  authController.updateUser
);
router.delete("/users", authMiddleware, authController.deleteUser);

module.exports = router;
