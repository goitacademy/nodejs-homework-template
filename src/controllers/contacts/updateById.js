const express = require("express");
const router = express.Router();
const { updateContact } = require("../../models");

const updateById = router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  if (!data) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  if (!req.body) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data,
  });
});

module.exports = updateById;
