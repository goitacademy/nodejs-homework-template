import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
import { contactSchema } from "../../validators.js";

const router = express.Router();

router.get("/contacts", async (_req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json({
      status: "success",
      message: "Pobrano całą listę kontaktów!!",
      data: allContacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/contacts/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    console.log(req.params);
    if (contact) {
      res.json({
        status: "success",
        message: `Wyszukiwanie kontaktu po ID, ID kontaktu: ${req.params.contactId}`,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Nie znaleziono kontaktu o podanym ID",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/contacts/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        message: "contact deleted",
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }
    const newContact = await addContact(name, email, phone);
    res.json({
      status: "success",
      message: "Kontakt został dodany do listy",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/contacts/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const { error } = contactSchema.validate(
      { name, email, phone },
      { abortEarly: false }
    );

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }
    const updatedContact = await updateContact(contactId, name, email, phone);
    if (!updatedContact) {
      return res.status(404).json({
        status: "error",
        message: `Nie znaleziono kontaktu o id: ${contactId}`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Zaktualizowano dane kontaktu o id: ${contactId}`,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
