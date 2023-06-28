const express = require("express");

const router = express.Router();

const Contact = require("../../models/contact");
const { boolean } = require("joi");

const auth = require("../../config/authorization")


// Manage contacts

router.get("/", auth, async (req, res, next) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(404).json({
      status: "Not found",
      code: 404,
    });
    next(error);
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  try {
    data = await Contact.findOne({ _id: req.params.contactId });

    return res.json(data);
  } catch (error) {
    res.status(404).json({
      status: "Contact not found",
      code: 404,
    });
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const data = await Contact.create(req.body);
    console.log(data)
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
  try {
    data = await Contact.findByIdAndRemove({ _id: req.params.contactId });
    if (data) {
      return res.json({
        message: `Contact with ${req.params.contactId} deleted`,
      });
    }
    return res.json({ message: "Contact not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", auth, async (req, res, next) => {
  try {
    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );

    console.log(data);
    if (data) {
      return res.json(data);
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Contact not found",
      code: 404,
    });
    next(error);
  }
});

router.patch("/:contactId/favorite", auth, async (req, res, next) => {
  try {
    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body
    );
    if (!req.body.favorite === boolean) {
      return res.status(400).send({ "message": "missing field favorite" });
    }
    return res.json(data);
  } catch (error) {
    res.status(404).json({
      status: "Contact not found",
      code: 404,
    });
    next(error);
  }
});
module.exports = router;