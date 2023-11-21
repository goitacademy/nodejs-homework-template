const express = require("express");
const router = express.Router();
const jsonParser = express.json();

const ContactsController = require("../../controllers/contact");
const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(new HttpError(404, `${id} is not valid`));
    return;
  }
  next();
};

router.use("/:id", isValidId);
router.use("/:id/favorite", isValidId);

router.get("/", ContactsController.getContacts);
router.get("/:id", ContactsController.getContact);
router.post("/", jsonParser, ContactsController.createContact);
router.put("/:id", jsonParser, ContactsController.updateContact);
router.delete("/:id", ContactsController.deleteContact);
router.patch(
  "/:id/favorite",
  jsonParser,
  ContactsController.updateStatusContact
);

module.exports = router;
