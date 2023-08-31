const express = require("express");
const pls = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await pls.listContacts();
  // console.log(req.body);
  // console.log(Object.keys(req.body).length);
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
  if (response.message === "missing required name - field") {
    res.status(404).json(response);
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
  // await pls.updateContact(req.params.contactId, req.body);
  res.json({ message: "template message" });
});

// @ PUT /api/contacts/:id
// Otrzymuje parametr id;
// otrzymuje body w formacie json z aktualizacją dowolnych pól name, email i phone;
// jeżeli nie ma body, zwraca json z kluczem {"message": "missing fields"} i statusem 400
// jeśli z body wszystko w porządku, wywołuje funkcję pdateContact(contactId, body) (napisz ją) dla aktualizacji kontaktu w pliku contacts.json;

module.exports = router;
