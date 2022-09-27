const express = require("express");

// const contacts = require("../../models/contacts");
const ctrl = require("../../controllers");

const { RequestError } = require("../../helpers");

const router = express.Router();
const { schemas } = require("../../models/contact");

router.get("/", async (req, res, next) => {
  try {
    await ctrl.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await ctrl.getById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = req.body;
    const { error } = schemas.addSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    await ctrl.add(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await ctrl.removeById(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const contact = req.body;
    if (Object.keys(contact).length === 0) {
      throw RequestError(400, "missing fields");
    }
    const { error } = schemas.addSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    await ctrl.updateById(req, res);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const contact = req.body;
    if (Object.keys(contact).length === 0) {
      throw RequestError(400, "missing fields");
    }
    const { error } = schemas.updateFavoriteSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    await ctrl.updateFavorites(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
