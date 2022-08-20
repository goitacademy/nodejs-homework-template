const express = require("express");
const Joi = require("joi");
const router = express.Router();
// const { basedir } = global;
// можно разобратся с basedir

const ctrl = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));
// getById не работает
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put("/:id", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().min(3).max(30),
  });
  const { name, email, phone } = await req.body;
  const validationResult = schema.validate(req.body);
  if (validationResult.error || (!name && !email && !phone)) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { id } = req.params;
  const data = await updateContact(id, req.body);
  if (data.message) {
    res.status(404).json(data);
  }
  res.status(200).json(data);
});

module.exports = router;
