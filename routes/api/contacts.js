const express = require("express");
const Contacts = require("../../model/index");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("list");
    return res.json({
      status: "success",
      code: 200,
      data: await Contacts.listContacts(),
    });
  } catch (error) {
    next(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    console.log("get by ID");
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contact,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      massage: "not found",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
