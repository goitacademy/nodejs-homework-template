const express = require("express");

const { Contact, shemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const isValidId = require("../../middlewares");

const router = express.Router();

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isValidId, async (req, res, next) => {
  try {
    // req.params - дает наш id
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    // если передать в некст error он пойдет искать фунциию с 4ма агрументами
    // app.use((err, req, res, next)
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // валидация формы (схема)
    const { error } = shemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    //запрос
    const result = await Contact.create(req.body);
    //ответ
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isValidId, async (req, res, next) => {
  try {
    const { error } = shemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", isValidId, async (req, res, next) => {
  try {
    const { error } = shemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
