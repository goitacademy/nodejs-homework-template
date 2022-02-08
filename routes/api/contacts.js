const express = require("express");

const CreateError = require("http-errors");
const Mongoose = require("mongoose");
const router = express.Router();

const { Contact, schemas } = require("../../models/contact");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const filter = { owner: _id };

    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite && !["true", "false"].includes(favorite)) {
      throw new CreateError(404, "Not found");
    }

    if (favorite !== undefined) {
      filter.favorite = favorite;
    }

    if (isNaN(page) && isNaN(limit)) {
      throw new CreateError(400, "Bad request");
    }

    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit: +limit,
    }).populate("owner", "email");
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!Mongoose.Types.ObjectId.isValid(contactId)) {
      throw new CreateError(404, "Not valid ID");
    }

    const result = await Contact.findById(contactId);
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);

    if (error) {
      throw new CreateError(400, error.message);
    }

    const data = { ...req.body, owner: req.user._id };
    const result = await Contact.create(data);

    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(contactId)) {
      throw new CreateError(404, "Not valid ID");
    }

    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(contactId)) {
      throw new CreateError(404, "Not valid ID");
    }
    const { error } = await schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(contactId)) {
      throw new CreateError(404, "Not valid ID");
    }

    const { error } = await schemas.updateFavorite.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
