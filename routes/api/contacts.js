const express = require("express");
const contactsData = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

router.get("/api/contacts", async (req, res, next) => {
  const contacts = await contactsData.listContacts();
  console.log("contacts:", contacts);
  res.status(200).json(contacts);
});

router.get("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsData.getContactById(id);

  if (!contact) {
    const err = new Error("Movie not found");
    err.status = 404;
    return next(err);
  }
  return res.json(contact);
});

router.post("/api/contacts", async (req, res, next) => {
  // custom validation
  // const { name, email, phone } = req.body;
  // if (!name || !email || !phone) {
  //   return res.json({ message: "missing required name field" });
  // }
  const contacts = await contactsData.addContact(req.body);

  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(7).required(),
  });
  const { error } = schema.validate(req.body);

  function HttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
  }

  if (error) {
    return next(HttpError(400, error.message));
  }

  return res.status(201).json(contacts);
});

router.delete("/api/contacts/:id", async (req, res, next) => {
  console.log("req.body", req.body);

  const isDeleted = await contactsData.removeContact(req.params.id);

  if (isDeleted) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/api/contacts/:id", async (req, res, next) => {
  console.log("req.body", req.body.name);

  // if (!req.body) {
  //   return res.status(400).json({ message: "missing fields" });
  // }
  const contact = await contactsData.updateContact(req.params.id, req.body);

  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(7).required(),
  });
  const { error } = schema.validate(req.body);

  function HttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
  }

  if (error) {
    return next(HttpError(400, error.message));
  }

  if (contact === null) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
});

module.exports = router;
