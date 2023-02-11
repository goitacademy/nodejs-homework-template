const express = require("express");
const ContactsController = require("../../controllers/ContactsController");
const { joiSchema } = require("../../models/contacts");
const { tryCatchWrapper } = require("../../helpers/index");

const router = express.Router();

router.post(
  "/contacts",
  (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      console.log(req.body);
      res.status(400).json({ message: "missing required name field" });
      throw error;
    }
    next();
  },
  ContactsController.addNewContact
);
router.get("/contacts", tryCatchWrapper(ContactsController.getAll));
router.get("/contacts/:id", tryCatchWrapper(ContactsController.getOne));
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
  tryCatchWrapper(ContactsController.update)
);
router.delete("/contacts/:id", tryCatchWrapper(ContactsController.remove));
router.patch(
  "/contacts/:id/favorite",
  tryCatchWrapper(ContactsController.updateStatusContact)
);

module.exports = router;
