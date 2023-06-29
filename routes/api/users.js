const express = require("express");
const Contact = require("../../service/schemas/contact");
const router = express.Router();

router.post("/login", async (req, res, next) => {});

router.post("/signup", async (req, res, next) => {});

router.get("/contacts", async (req, res, next) => {
  const contacts = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

module.exports = router;
