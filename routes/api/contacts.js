import express from "express";
import Joi from "joi";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "./../../models/contacts.js";

export const router = express.Router();

const schemaAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const schemaEdit = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).unknown(false);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (err) {
    res
      .status(500)
      .json(`An error occurred while getting the contact list: ${err}`);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);

    if (!contact) {
      res.status(404).json(`Contact with id ${id} not found`);

      return false;
    }

    return res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while getting the contact: ${err}`);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.status(400).json("Error! Missing fields! Empty request is not allowed");

    return;
  }

  const { error } = schemaAdd.validate(body);

  if (error) {
    res.status(400).json(`Error: ${error.details[0].message}`);

    return;
  }

  try {
    const contact = await addContact(body);

    if (!contact) {
      res.status(404).json(`Contact not found`);

      return false;
    }

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the contact: ${err}`);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const isContactRemoved = await removeContact(id);

    if (!isContactRemoved) {
      res.status(404).json(`Contact with id ${id} not found`);

      return false;
    }

    res.status(200).json({
      message: `Contact with ID ${id} has been successfully removed.`,
    });
  } catch (err) {
    res
      .status(500)
      .json(`An error occurred while removing the contact: ${err}`);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.status(400).json("Error! Missing fields! Empty request is not allowed");

    return;
  }

  const { error } = schemaEdit.validate(body);

  if (error) {
    res.status(400).json(`Error field: ${error.details[0].message}`);

    return;
  }

  try {
    const updatedContact = await updateContact(id, body);

    if (!updatedContact) {
      res.status(404).json(`Contact with id ${id} not found`);

      return false;
    }

    res.json({
      status: "success",
      code: 200,
      data: { updatedContact },
    });
  } catch (err) {
    res
      .status(500)
      .json(`An error occurred while updating the contact: ${err}`);
  }
});

// const express = require("express");
// const Joi = require("joi");

// const router = express.Router();

// let contacts = [
//   {
//     id: 1,
//     name: "Mija Cziczi",
//     email: "mijacziczi@example.com",
//     phone: "111-11-11",
//   },
//   { id: 2, name: "Jane Doe", email: "janedoe@example.com", phone: "222-22-22" },
// ];

// const contactForm = Joi.object({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().min(7).required(),
// });

// function checkContactExists(req, res, next) {
//   const contactId = parseInt(req.params.contactId);
//   const contact = contacts.find((contact) => contact.id === contactId);

//   if (!contact) {
//     return res.status(404).json({ message: "Contact not found" });
//   }
//   next();
// }

// router.get("/", async (req, res, next) => {
//   try {
//     // Błędne użycie 'constacts', poprawione poniżej
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", checkContactExists, async (req, res, next) => {
//   try {
//     const contactId = parseInt(req.params.contactId);
//     const contact = contacts.find((contact) => contact.id === contactId);
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactForm.validate(req.body);
//     if (error) {
//       return res
//         .status(400)
//         .json({ message: `Validation error: ${error.message}` });
//     }
//     const { name, email, phone } = req.body;
//     const newContact = {
//       id: contacts.length + 1,
//       name,
//       email,
//       phone,
//     };
//     contacts.push(newContact);
//     res.status(201).json(newContact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", checkContactExists, async (req, res, next) => {
//   try {
//     const contactId = parseInt(req.params.contactId);
//     contacts = contacts.filter((contact) => contact.id !== contactId);
//     res.json({ message: "Contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", checkContactExists, async (req, res, next) => {
//   try {
//     const contactId = parseInt(req.params.contactId);
//     // Brak deklaracji contactSchema, poprawione poniżej
//     const { error } = contactForm.validate(req.body);

//     if (error) {
//       return res
//         .status(400)
//         .json({ message: `Validation error: ${error.message}` });
//     }

//     const { name, email, phone } = req.body;
//     const updatedContactIndex = contacts.findIndex((c) => c.id === contactId);
//     contacts[updatedContactIndex] = {
//       ...contacts[updatedContactIndex],
//       name,
//       email,
//       phone,
//     };
//     res.json(contacts[updatedContactIndex]);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
