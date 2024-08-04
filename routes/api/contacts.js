const express = require("express");
const Joi = require("joi");
const Contact = require("../../models/contacts");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({
      _id: contactId,
      owner: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `missing required ${error.details[0].context.key} field`,
      });
    }

    const newContact = new Contact({ ...req.body, owner: req.user._id });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    }).min(1);

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      { favorite },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
