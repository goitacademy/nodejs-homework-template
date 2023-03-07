const express = require("express");
const path = require("path");
const router = express.Router();
const Joi = require("joi");

const contactsFuncPath = path.resolve("models/contacts.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(contactsFuncPath);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log("contacts: ", contacts);

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await getContactById(contactId);

    if (!contactById) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contactById,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;

    const joiSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(10).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "uk", "ua", "org"] },
        })
        .required(),
    });

    const validationResult = joiSchema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    await addContact(body);

    res.status(201).json({
      message: `New contact has been created!`,
      status: "success",
      code: "201",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "missing required name field" });
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json({
      message: `Contact with id:${contactId} has been removed!`,
      status: "success",
      code: "200",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    if (!contactId) {
      return res.status(400).json({ message: "missing id" });
    }

    const joiSchema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      phone: Joi.string().min(10).max(15).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "uk", "ua", "org"] },
        })
        .optional(),
    });

    const validationResult = joiSchema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    await updateContact(contactId, body);

    res.status(200).json({
      message: `Contact with id:${contactId} has been updated!`,
      status: "success",
      code: "200",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
    next(error);
  }
});

module.exports = router;
