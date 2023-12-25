const express = require("express");
const router = express.Router();
const control = require("../../controlers/control");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../Shema/shema");
//======================getAll==========================
router.get("/", control.getAll);
//========================getID========================
router.get("/:contactId", control.getID);
//=======================post=========================
router.post("/", validateBody(schemas.contactSchema), control.post);
//=======================delete=========================
router.delete(
  "/:contactId",

  control.delet
);
//========================put========================
router.put("/:contactId", validateBody(schemas.contactSchema), control.put);

module.exports = router;
