const express = require("express");
const ContactsController = require("../../controllers/ContactsController");
const { joiSchema } = require("../../models/contacts");
const router = express.Router();

router.post(
  "/contacts",
  (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.status(400).json({ message: "missing required name field" });
      throw error;
    }
    next();
  },
  ContactsController.addNewContact
);
router.get("/contacts", ContactsController.getAll);
router.get("/contacts/:id", ContactsController.getOne);
router.put(
  "/contacts/:id",
  (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 404;
      throw error;
    }
    next();
  },
  ContactsController.update
);
router.delete("/contacts/:id", ContactsController.remove);

module.exports = router;
