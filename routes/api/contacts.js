const express = require("express");
const Contact = require("../../models/contact");
const createError = require("../../helpers/createError");
const Joi = require("joi");
const { authorize } = require("../../middlewares");
const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const contactsUpdateScheme = Joi.object({
  favorite: Joi.boolean().required(),
});
const router = express.Router();

router.get("/", authorize, async (req, res, next) => {
  try {
    const { page, limit, favorite } = req.query;
    const { _id: owner } = req.user;
    const booleanFavorite = favorite === "true";
    if (page && limit && favorite) {
      const contactsData = await Contact.find(
        { owner, favorite: booleanFavorite },
        "-createdAt -updatedAt"
      )
        .skip(Number(page))
        .limit(Number(limit))
        .populate("owner", "name email");
      res.json(contactsData);
    } else if (page && limit) {
      const contactsData = await Contact.find(
        { owner },
        "-createdAt -updatedAt"
      )
        .skip(Number(page))
        .limit(Number(limit))
        .populate("owner", "name email");
      res.json(contactsData);
    } else {
      const contactsData = await Contact.find(
        { owner },
        "-createdAt -updatedAt"
      ).populate("owner", "name email");
      res.json(contactsData);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const id = req.params.contactId;
    const contactsData = await Contact.findOne({ _id: id, owner });
    if (contactsData) res.json(contactsData);
    else next();
  } catch (error) {
    next(error);
  }
});

router.post("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { body } = req;
    const { error } = contactsScheme.validate(body);

    if (error) throw createError(400, error.message);
    const addedContact = await Contact.create({ ...body, owner });

    res.status(201).json(addedContact);
  } catch (error) {
    if (error.name === "ValidationError") error.status = 400;

    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const removedContact = await Contact.findByIdAndRemove(id);
    if (removedContact) res.json({ message: "Successfully deleted" });
    else next();
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { body } = req;
    const { error } = contactsScheme.validate(body);
    if (error) throw createError(400, error.message);
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedContact) {
      next();
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const favorite = req.body;
    if (!favorite) throw createError(400, "missing field favorite");
    const { error } = contactsUpdateScheme.validate(favorite);
    if (error) throw createError(400, error.message);
    const updatedContact = await Contact.findByIdAndUpdate(id, favorite, {
      new: true,
    });
    if (!updatedContact) {
      next();
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
