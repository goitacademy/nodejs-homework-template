const express = require("express");
const {
  getAllUsers,
  getUserById,
  addUser,
  // deleteUserById,
  // updateUser,
} = require("../../controllers/usersController");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:contactId", getUserById);

router.post("/", addUser);

// router.delete("/:contactId", deleteUserById);

// router.put("/:contactId", updateUser);

module.exports = router;
