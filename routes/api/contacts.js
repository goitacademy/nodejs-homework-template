const express = require("express");

const router = express.Router();

const Contact = require("../../models/contact");
const User = require("../../models/user");

const { boolean } = require("joi");

const auth = require("../../config/authorization")


// Manage contacts

router.get("/", auth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const token = req.headers.authorization.slice(7)

    const skip = (page - 1) * limit;

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid token",
      });
    }

    const filter = {};

    if (req.query.favorite) {
      filter.favorite = req.query.favorite === "true";
    }

    const contacts = await Contact.find({ owner: user._id, ...filter }).skip(skip).limit(limit)

    res.json({
      page,
      limit,
      contacts,
    });
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
    const token = req.headers.authorization.slice(7)
    const user = await User.findOne({ token });
    console.log(user)

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid token",
      });
    }

    data = await Contact.findOne({ _id: req.params.contactId,  owner: user._id });

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

  const token = req.headers.authorization.slice(7)
  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Invalid token",
    });
  }
  
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
    const token = req.headers.authorization.slice(7)
    const user = await User.findOne({ token });
  
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid token",
      });
    }

    data = await Contact.findByIdAndRemove({ _id: req.params.contactId, owner: user._id });
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
    const token = req.headers.authorization.slice(7)
    const user = await User.findOne({ token });
  
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid token",
      });
    }

    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true },
      { owner: user._id },
    );

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
    const token = req.headers.authorization.slice(7)
    const user = await User.findOne({ token });
  
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Invalid token",
      });
    }

    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { owner: user._id },
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