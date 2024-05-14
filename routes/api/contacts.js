const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

const contex = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.number().integer().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.get("/", async (req, res, next) => {
  const users = await listContacts();
  res.status(200).send(users);
});

router.get("/:contactId", async (req, res, next) => {
  const user = await getContactById(req.params.contactId);
  if (user.length) {
    res.status(200).send(user);
  } else {
    res.status(404);
    res.json({ message: "Not Found" });
  }
});

router.post("/", async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const { error } = contex.validate({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
    if (error) {
      res.status(400).send({ message: error.message });
    } else {
      const contact = await addContact(req.body);
      res
        .status(201)
        .send({ message: "Contacto Creado exitosamente", contact: contact });
    }
  } else {
    res.status(400);
    res.json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const msg = await removeContact(req.params.contactId);
  if (msg === "id no existe") {
    res.status(404).send({ message: "Not Found" });
  } else {
    res.status(200).send({ message: "Eliminado" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const { error } = contex.validate({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
    if (error) {
      res.status(404).send({ message: error.message });
    } else {
      const index = await updateContact(req.params.contactId, req.body);
      if (index === 1) {
        res.status(200).send({
          messege: "Update Conctact Completed",
          contact: {
            id: req.params.contactId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          },
        });
      } else {
        res.status(404).send({ message: "Id not found" });
      }
    }
  } else {
    res.status(404).send({ message: "missing fields" });
  }
});

module.exports = router;
