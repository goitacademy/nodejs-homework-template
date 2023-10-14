const express = require("express");
const {Contact} = require("../../models/contact")
const {schemas} = require("../../models/contact")
const router = express.Router();

const { HttpError } = require("../../helpers");
const {isValidId} = require("../../middlewares")

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { error } = schemas.updateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body,  {new: true});
    if (!result) {
      throw HttpError(404, "Not found!");
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
});


router.patch("/:contactId/favorite", isValidId, async (req,res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found!");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
