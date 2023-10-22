const express = require("express");

const tryCatchWrapper = require("../../utils/controllerWrapper");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite
  } = require("../../controllers/contacts")

  const {userRegister, userLogin} = require("../../controllers/users") 

const router = express.Router();

router.get("/", tryCatchWrapper(listContacts));

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post("/", tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContact));

router.put("/:contactId", tryCatchWrapper(updateContact));

router.patch("/:contactId/favorite", tryCatchWrapper(updateFavorite));

router.post('/users/register', tryCatchWrapper(userRegister));

router.post('/users/login', tryCatchWrapper(userLogin));

module.exports = router;
