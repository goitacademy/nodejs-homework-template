import express from "express";
import { Contact } from "../../models/contacts.js";
import authMiddleware from "../../middleware/jwt.js";

const router = express.Router();

router.get("/contacts", authMiddleware, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    return res.json({
      status: "success",
      result: contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/contacts/:contactId", authMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact || contact.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        status: "404 Not Found",
        code: 404,
        message: "Nie znaleziono kontaktu o podanym ID",
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: `Wyszukiwanie kontaktu po ID, ID kontaktu: ${contactId}`,
      data: contact,
    });
  } catch (error) {
    console.error(`Błąd podczas wyszukiwania kontaktu: ${error.message}`);
    next(error);
  }
});

router.delete(
  "/contacts/:contactId",
  authMiddleware,
  async (req, res, next) => {
    const { contactId } = req.params.contactId;
    try {
      const contact = await Contact.findOneAndDelete(contactId);
      if (!contact || contact.owner.toString() !== req.user._id.toString()) {
        return res.status(404).json({
          status: "404 Not Found",
          code: 404,
          message: "Nie znaleziono kontaktu o podanym ID",
        });
      }
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact Delete",
        data: contact,
      });
    } catch (error) {
      console.error(`Błąd podczas wyszukiwania kontaktu: ${error.message}`);
      next(error);
    }
  }
);

router.post("/contacts", authMiddleware, async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const userId = req.user._id;
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      favorite,
      owner: userId,
    });
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

router.put("/contacts/:contactId", authMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const userId = req.user._id;
  try {
    const contact = await Contact.findOne({ _id: contactId, owner: userId });
    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: `Nie znaleziono kontaktu o id: ${contactId} lub nie masz uprawnień do jego edycji`,
      });
    }
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

router.patch(
  "/contacts/:contactId/favorite",
  authMiddleware,
  async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const userId = req.user._id;
    try {
      if (!favorite) {
        return res.status(400).json({
          status: "error",
          message: `Brak wypełnionego pola favorite`,
        });
      }
      const contact = await Contact.findOne({ _id: contactId, owner: userId });
      if (!contact) {
        return res.status(404).json({
          status: "error",
          message: `Nie znaleziono kontaktu o id: ${contactId} lub nie masz uprawnień do jego edycji`,
        });
      }
      contact.favorite = favorite;
      const updateStatusContact = await contact.save();

      res.status(200).json({
        status: "success",
        message: `Zaktualizowano dane kontaktu o id: ${contactId}, favorite: ${favorite}`,
        data: updateStatusContact,
      });
    } catch (error) {
      console.error(`Błąd podczas zmiany statusu: ${error.message}`);
      next(error);
    }
  }
);

export default router;
