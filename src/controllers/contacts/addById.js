const express = require("express");
const router = express.Router();
const { addContact } = require("../../models");

const addById = router.post("/", async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
});

module.exports = addById;
