import express from "express";
import Joi from "joi";
import * as contactsController from "../../controllers/contactsController.js";

const router = express.Router();

// Definiujemy schemat walidacyjny dla kontaktu
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// Middleware do walidacji danych wejściowych
const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Routes
router.get("/", async (req, res, next) => {
  // ...
});

router.get("/:contactId", async (req, res, next) => {
  // ...
});

router.post("/", validateContact, async (req, res, next) => {
  try {
    const newContact = await contactsController.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  // ...
});

router.put("/:contactId", validateContact, async (req, res, next) => {
  try {
    const updatedContact = await contactsController.updateContact(
      req.params.contactId,
      req.body
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
