const controlers = require("../../controlers/contacts/index");
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  console.log(controlers.getList);
  controlers.getList(req, res);
});
router.get("/:contactId", async (req, res, next) => {
  controlers.getListById(req, res, next);
});

router.post("/", async (req, res, next) => {
  controlers.postContact(req, res, next);
});

router.delete("/:contactId", async (req, res, next) => {
  controlers.deleteById(req, res, next);
});

router.put("/:contactId", async (req, res, next) => {
  controlers.putById(req, res, next);
});
router.patch("/:contactId", async (req, res, next) => {
  controlers.updateStatusContact(req, res, next);
});

module.exports = router;
