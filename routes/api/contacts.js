const express = require("express");
const contactsModels = require("../../models/contacts");
const usersModels = require("../../models/users");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) =>
  contactsModels.listContacts(req, res)
);

router.get("/:contactId", authMiddleware, async (req, res, next) =>
  contactsModels.getContactById(req, res)
);
router.post("/", authMiddleware, async (req, res, next) =>
  contactsModels.addContact(req, res)
);

router.delete("/:contactId", authMiddleware, (req, res, next) =>
  contactsModels.removeContact(req, res)
);

router.put("/:contactId", authMiddleware, (req, res, next) =>
  contactsModels.updateContact(req, res)
);

router.patch("/:contactId/favorite", authMiddleware, (req, res, next) =>
  contactsModels.updateStatusContact(req, res)
);

router.post("/users/register", async (req, res, next) =>
  usersModels.addUser(req, res)
);

router.get("/users/login", async (req, res, next) =>
  usersModels.getUser(req, res)
);

router.post("/users/logout", authMiddleware, async (req, res, next) =>
  usersModels.logOut(req, res)
);

router.get("/users/current", authMiddleware, async (req, res, next) =>
  usersModels.getCurrentUser(req, res)
);

module.exports = router;
