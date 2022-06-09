const express = require("express");
const router = express.Router();
const { listContacts } = require("../../models");

const getAll = router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: data,
    },
  });
});

module.exports = getAll;
