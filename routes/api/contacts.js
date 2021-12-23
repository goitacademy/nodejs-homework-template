const express = require("express");
const router = express.Router();
const { listContacts, getContactById } = require("../../model/index");

router.get("/", async (req, res, next) => {
  const result = await listContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
    message: "get",
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  res
    .status(200)
    .json({ status: "success", code: 200, message: "get by ID", data: result });
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
