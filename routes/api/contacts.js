const express = require("express");
const router = express.Router();
const control = require("../../controllers/contactControllers");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../Shema/shema");
const contactsMiddlewares = require("../../middlewares/contactsMiddlewares");
//======================getAll==========================
router.get("/", control.getAll);
//========================getID========================
router.get(
  "/:contactId",
  contactsMiddlewares.checkContactsGetId,
  control.getID
);
//=======================post=========================
router.post(
  "/",
  contactsMiddlewares.checkContactsCreateValidat,
  validateBody(schemas.contactSchema),
  control.post
);
//=======================delete=========================
router.delete(
  "/:contactId",
  contactsMiddlewares.checkContactsCreateValidat,
  control.delet
);
//========================put========================
router.put(
  "/:contactId",
  contactsMiddlewares.checkContactsCreateValidat,
  validateBody(schemas.contactSchema),
  control.put
);

module.exports = router;
