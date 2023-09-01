const express = require("express");
const pls = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await pls.listContacts();
  res.json(response);
});

router.get("/:contactId", async (req, res, next) => {
  const response = await pls.getContactById(req.params.contactId);
  if (response === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(response);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const response = await pls.removeContact(req.params.contactId);
  if (response.message === "Not found") {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
});

router.post("/", async (req, res, next) => {
  const response = await pls.addContact(req.body);
  if (response.message === "Your request is not in proper format.") {
    res.status(400).json(response);
  } else {
    res.status(201).json(response);
  }
});

// @ POST /api/contacts
// Otrzymuje body w formacie name, email, phone} (wszystkie pola są obowiązkowe);
// jeśli w body brak jakichś obowiązkowych pól, zwraca json z kluczem {"message": "missing required name - field"} i statusem 400;
// jeśli z body wszystko w porządku, dodaje unikalny identyfikator do obiektu kontaktu;
// wywołuje funkcję addContact(body) do zapisania kontaktu w pliku contacts.json;
// w rezultacie pracy funkcji zwraca obiekt z dodanymi id {id, name, email, phone} i statusem 201.

router.put("/:contactId", async (req, res, next) => {
  const response = await pls.updateContact(req.params.contactId, req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  }
  if (response.message === "Not found") {
    res.status(404).json(response);
  } else if (response.message === "Your request is not in proper format.") {
    res.status(400).json(response);
  } else {
    res.status(200).json(response);
  }
});

module.exports = router;
