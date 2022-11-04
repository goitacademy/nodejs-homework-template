const express = require("express");
const {
  addContactSchema,
  changeContactSchema,
} = require("./middleware/schemes/validationschemes");

const {
  postAddContactCtrl,
  putChangeContactCtrl,
  getContactsCtrl,
  getContactByIDCtrl,
  deleteContactCtrl,
  patchFavoriteContactCtrl,
} = require("../../controllers/contactsControllers");
const { validation } = require("./middleware/validationBody");

const router = express.Router();

router.get("/", getContactsCtrl);

router.get("/:contactId", getContactByIDCtrl);

router.post("/", validation(addContactSchema), postAddContactCtrl);

router.delete("/:contactId", deleteContactCtrl);

router.put(
  "/:contactId",
  validation(changeContactSchema),
  putChangeContactCtrl
);

router.patch("/:contactId/favorite", patchFavoriteContactCtrl);

module.exports = router;
