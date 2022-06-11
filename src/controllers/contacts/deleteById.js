const express = require("express");
const router = express.Router();
const { removeContact } = require("../../models");

const deleteById = router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (!data) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data,
  });
});

module.exports = deleteById;
