const express = require("express");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../utils/HttpError");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();

  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { params } = req;

  try {
    const data = await contacts.getContactById(params.contactId);

    if (!data) {
      throw HttpError();
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    body: { name, phone, email },
    body,
  } = req;

  try {
    if (!name) {
      throw HttpError("missing required name field");
    } else if (!phone) {
      throw HttpError("missing required phone field");
    } else if (!email) {
      throw HttpError("missing required email field");
    }

    const data = await contacts.addContact(body);

    if (!data) {
      throw HttpError();
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  try {
    const data = await contacts.removeContact(contactId);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  try {
    if (!Object.keys(body).length) {
      throw HttpError(400, "Missing fields");
    }

    const data = await contacts.updateContact(contactId, body);

    if (!data) {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }

  res.json(data);
});

module.exports = router;
