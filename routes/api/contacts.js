import express from "express";
import { Contact } from "../../models/contacts.js";

const router = express.Router();

router.get("/contacts", async (_req, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.json({
      status: "success",
      result: contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/contacts/:contactId", async (req, res, next) => {
  console.log("Hej");
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    console.log(req.params);
    if (contact) {
      res.json({
        status: "success",
        message: `Wyszukiwanie kontaktu po ID, ID kontaktu: ${contactId}`,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Nie znaleziono kontaktu o podanym ID",
      });
    }
  } catch (error) {
    console.error(`Błąd podczas wyszukiwania kontaktu: ${error.message}`);
    next(error);
  }
});

router.delete("/contacts/:contactId", async (req, res, next) => {
  const { contactId } = req.params.contactId;
  try {
    const contact = await Contact.findOneAndDelete(contactId);
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
    console.error(`Błąd podczas wyszukiwania kontaktu: ${error.message}`);
    next(error);
  }
});

router.post("/contacts", async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const newContact = await Contact.create({ name, email, phone, favorite });
    res.json({
      status: "success",
      message: "Kontakt został dodany do listy kontaktów w bazie danych",
      data: newContact,
    });
  } catch (error) {
    console.error(`Błąd podczas dodawania nowego kontaktu: ${error.message}`);
    next(error);
  }
});

router.put("/contacts/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
        favorite,
      },
      { new: true, runValidators: true }
    );
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
    console.error(
      `Błąd podczas aktualizowania danych kontaktu: ${error.message}`
    );
    next(error);
  }
});

router.patch("/contacts/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    if (!favorite) {
      return res.status(400).json({
        status: "error",
        message: `Brak wypełnionego pola favorite`,
      });
    }
    const updateStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true, runValidators: true }
    );
    if (!updateStatusContact) {
      return res.status(404).json({
        status: "error",
        message: `Nie znaleziono kontaktu o id: ${contactId}`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Zaktualizowano dane kontaktu o id: ${contactId}, favorite: ${favorite}`,
    });
  } catch (error) {
    console.error(`Błąd podczas zmiany statusu: ${error.message}`);
    next(error);
  }
});

export default router;
