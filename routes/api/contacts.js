const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contactsService = require("../../models/contacts");

// const contactAddSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": `missing required name field`,
//   }),
//   email: Joi.string().required().messages({
//     "any.required": `missing required name field`,
//   }),
//   phone: Joi.string().required().messages({
//     "any.required": `missing required name field`,
//   }),
// });

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getById(contactId);
    if (!result) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    if (result.name && result.email && result.phone) {
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } catch (error) {
    const { status = 500, message = "server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    const { status = 404 } = error;
    res.status(status).json({
      message: "Not found",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    console.log(req.body, "<<<<<<<");
    if (req.body.name && req.body.email && req.body.phone) {
      console.log(req.params);
      const result = await contactsService.updateContact(req.params, req.body);
      console.log(result, "result");

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "missing fields" });
    }
  } catch (error) {
    const { status = 500, message = "server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

module.exports = router;
