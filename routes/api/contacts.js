const express = require("express");

const { createError } = require("../../helpers");

const { Contact } = require("../../models/contact");

const {
  validation,
  validationFavorite,
  isVaidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", isVaidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId });
    if (!result) {
      throw createError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(schemas.add), async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", isVaidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  isVaidId,
  validation(schemas.add),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });
      if (!result) {
        throw createError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:contactId/favorite",
  isVaidId,
  validationFavorite(schemas.updateFavorite),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });
      if (!result) {
        throw createError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
