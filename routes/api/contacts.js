const express = require('express');
const {
  getAll,
  getById,
  create,
  update,
  deleteById,
} = require("../../controllers/api/contactsController");

const router = express.Router();

router.get("/", (req, res, next) => {
  getAll(req, res, next);
});

router.get("/:contactId", (req, res, next) => {
  getById(req, res, next);
});

router.post("/", (req, res, next) => {
  create(req, res, next);
});

router.put("/:contactId", (req, res, next) => {
  update(req, res, next);
});

router.delete("/:contactId", (req, res, next) => {
  deleteById(req, res, next);
});

module.exports = router
