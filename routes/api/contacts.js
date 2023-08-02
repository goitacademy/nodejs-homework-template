
const express = require('express')

const Contact = require("../../models/contacts");
const {
  HttpError,
  addContactsSchema,
  patchContactsFavoriteSchema,
} = require("../../helpers");

const router = express.Router();



router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
       throw HttpError(404);
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactsSchema.validate(req.body);
    if (error) {
      throw HttpError(404, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
     throw HttpError(404);
    }
       res.status(200).json({ message: "contact deleted", data: result });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addContactsSchema.validate(req.body);
     if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json({ message: "contact updated", data: result });
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = patchContactsFavoriteSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json({ message: "contact updated", data: result });
  } catch (error) {
     next(error);
  }
});
module.exports = router;


