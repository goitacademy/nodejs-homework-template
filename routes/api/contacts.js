const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../modules/contacts");

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(16).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }),
});
const putSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(16),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data: data, code: 200, message: "succes" });
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await getContactById(contactId);
    if (data) {
      res.status(200).json({ data: data, code: 200, message: "succes" });
      return;
    }
    res.status(404).json({ code: 404, message: "Not found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", async (req, res, next) => {
  const reqValidate = postSchema.validate(req.body);
  const body = req.body;
  try {
    if (!reqValidate.error) {
      const data = await addContact(body);
      if (data) {
        res.status(201).json({ data: data, code: 201, message: "succes" });
      } else {
        res.status(400).json({
          code: 400,
          message: `a contact with mail ${body.email} alredy exists`,
        });
      }
      return;
    } else {
      res.status(400).json({ code: 400, message: reqValidate.error });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId);
    if (data) {
      res.status(200).json({ code: 200, message: "contact deleted" });
      return;
    } else {
      res.status(404).json({ code: 404, message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const reqValidate = putSchema.validate(req.body);
  console.log(reqValidate);
  const body = req.body;
  const { contactId } = req.params;
  try {
    if (!reqValidate.error) {
      const data = await updateContact(contactId, body);
      if (data) {
        res.status(201).json({ data: data, code: 200, message: "succes" });
      } else {
        res.status(400).json({
          code: 404,
          message: `Not found`,
        });
      }
      return;
    } else {
      res.status(400).json({ code: 400, message: reqValidate.error });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
