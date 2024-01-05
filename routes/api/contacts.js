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

  control.delet
);
//========================put========================
router.put("/:contactId", validateBody(schemas.contactSchema), control.put);

module.exports = router;
