const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { postValidation, putValidation } = require("../../validation");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());
  } catch (error) {
    console.error(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const searchedContact = await getContactById(req.params.contactId);

    if (!searchedContact) {
      res
        .status(404)
        .send(`Contact with id ${req.params.contactId} can't be found`);
    }

    res.status(200).json(searchedContact);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", postValidation, async (req, res, next) => {
  try {
    res.status(201).json(await addContact(req.body));
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const searchedContact = await getContactById(req.params.contactId);

    if (!searchedContact) {
      res
        .status(404)
        .send(`Contact with id ${req.params.contactId} can't be found`);
      return;
    }
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.error(error);
  }
});

router.put("/:contactId", putValidation, async (req, res, next) => {
  try {
    const searchedContact = await getContactById(req.params.contactId);
    // const bodyIsEmpty = !Object.keys(req.body).length;

    if (!searchedContact) {
      res
        .status(404)
        .send(`Contact with id ${req.params.contactId} can't be found`);
      return;
    }
    // if (bodyIsEmpty) {
    //   res.status(400).json({ message: "missing fields" });
    //   return;
    // }
    res.status(200).json(await updateContact(req.params.contactId, req.body));
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
