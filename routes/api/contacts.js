const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {schemas} = require("../../utils/validation/contactValidation");
const autenticate=require("../../middlewares/autenticate");
const isValidId=require("../../middlewares/isValidId");
const validateBody=require("../../middlewares/validateBody");

router.get("/",autenticate, ctrl.getAll);

router.get("/:id",autenticate, isValidId, ctrl.getContactById);

router.post("/",autenticate, validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:id",autenticate, isValidId, ctrl.deleteContact);

router.put("/:id",autenticate, isValidId, validateBody(schemas.addSchema), ctrl.putContact);

router.patch(
  "/:id/favorite",
  autenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
