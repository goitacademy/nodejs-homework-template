const express = require("express");
const CreateError = require("http-errors");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const { Contact, schemas } = require("../../models/contact");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, async (req, res, next) => {
  const { page = 1, limit = 10, favorite = false } = req.query;
  if (isNaN(page) || isNaN(limit)) {
    throw new CreateError(400, "Page and limit must be a Number!");
  }
  const skip = (page - 1) * limit;
  try {
    const { _id } = req.user;
    const result = await Contact.find(
      { owner: _id, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", ["email", "subscription"]);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    if (!ObjectId.isValid(contactId)) {
      throw new CreateError(400, { message: "Invalid MongoDB ID" });
    }
    const result = await Contact.findById({ _id: contactId, owner: _id });
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
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    if (!ObjectId.isValid(contactId)) {
      throw new CreateError(400, { message: "Invalid MongoDB ID" });
    }
    const result = await Contact.findByIdAndDelete({
      _id: contactId,
      owner: _id,
    });
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", authenticate, async (req, res, next) => {
  try {
    if (!req.body) {
      throw new CreateError(404, "missing fields");
    }
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { contactId } = req.params;
    const { _id } = req.user;
    if (!ObjectId.isValid(contactId)) {
      throw new CreateError(400, { message: "Invalid MongoDB ID" });
    }
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: _id },
      req.body,
      {
        new: true,
      }
    );
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
    if (!req.body) {
      throw new CreateError(400, "missing field favorite");
    }
    const { error } = schemas.patchFavorite.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { contactId } = req.params;
    const { _id } = req.user;
    if (!ObjectId.isValid(contactId)) {
      throw new CreateError(400, { message: "Invalid MongoDB ID" });
    }
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: _id },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
