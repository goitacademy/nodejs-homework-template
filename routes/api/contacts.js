const express = require("express");

const router = express.Router();

const routerOperation = require("../../controllers/controllers");

router.get("/", async (req, res, next) =>
  routerOperation.GetList(req, res, next)
);

router.get("/:id", async (req, res, next) => {
  routerOperation.GetById(req, res, next);
});

router.post("/", async (req, res, next) => {
  routerOperation.AddContact(req, res, next);
});

router.put("/:id", async (req, res, next) => {
  routerOperation.UpdateContact(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
  routerOperation.DeleteContact(req, res, next);
});

module.exports = router;
