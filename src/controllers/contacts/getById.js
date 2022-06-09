const express = require("express");
const router = express.Router();
const { getContactById } = require("../../models");

const getById = router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data,
  });
});

module.exports = getById;
