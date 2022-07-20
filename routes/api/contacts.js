const express = require("express");
const {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUser,
  updateStatusContact,
} = require("../../controllers/usersController");

const { ctrlWrapper } = require("../../middlewares/middlewares");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:contactId", getUserById);

router.post("/", ctrlWrapper(addUser));

router.delete("/:contactId", ctrlWrapper(deleteUserById));

router.put("/:contactId", ctrlWrapper(updateUser));

router.patch("/:contactId/favorite", ctrlWrapper(updateStatusContact));

module.exports = router;
