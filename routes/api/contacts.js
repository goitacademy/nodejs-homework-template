const express = require("express");

const router = express.Router();

const { createError } = require("../../helpers");
const authorize = require("../../middleware/authorize");

const Contact = require("../../models/contactModel");

const { contactsSchema, favoriteSchema } = require("../../schemas");


router.get("/", authorize, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite = false
    } = req.query;
    const { _id: owner } = req.user;
    const total = await Contact.countDocuments({ owner });
    // max page limit due to total cocntacts 
    const maxPage = Math.ceil(total / limit);

    const resPage = page > maxPage ? maxPage : page;
    const query = favorite ? { favorite, owner } : { owner };
    if (page < 1 || limit < 1) {
      throw createError(400, "Invalid page or limit");
    }

    const result = await Contact.find(query, "-createdAt -updatedAt")
      .populate("owner", "-password , -createdAt, -updateAt")
      .limit(limit)
      .skip((resPage - 1) * limit);
res.json({ contacts: result, total, page: resPage, limit });
    

    
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return next(createError(404, "Contact not found"));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw createError(error.message, "missing required name field");
    }

    const contact = await Contact.create(req.body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id",authorize, async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id",authorize, async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    //
    if (error) {
      throw createError(400, "missing fields");
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing favorite field");
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
