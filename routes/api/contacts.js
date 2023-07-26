const express = require("express");
const router = express.Router();
const middleW = require("../../middlewares");
const { apiCtrl } = require("../../controlers");
const { schemas } = require("../../schemas");

router.get("/", middleW.authenticate, apiCtrl.getContacts);

router.get(
  "/:id",
  middleW.authenticate,
  middleW.isValidId,
  apiCtrl.getContactsById
);

router.post(
  "/",
  middleW.authenticate,
  middleW.dontBody,
  middleW.validateBody(schemas.contactSchema),
  apiCtrl.addContact
);

router.delete(
  "/:id",
  middleW.authenticate,
  middleW.isValidId,
  apiCtrl.deleteContact
);

router.put(
  "/:id",
  middleW.authenticate,
  middleW.isValidId,
  middleW.dontBody,
  middleW.validateBody(schemas.contactPutSchema),
  apiCtrl.updateContactById
);

router.patch(
  "/:id/favorite",
  middleW.authenticate,
  middleW.isValidId,
  middleW.validateBody(schemas.favoriteSchema),
  apiCtrl.updateStatusById
);

module.exports = router;
