const express = require("express");
const { uid } = require("uid");
const Joi = require("joi");

const router = express.Router();

let contacts = [];

router.get("/", async (req, res, next) => {
  res.json({ contacts, status: "success" });
});

router.get("/:contactId", async (req, res, next) => {
  const [contact] = contacts.filter(
    (contact) => contact.id === req.params.contactId
  );

  if (!contact) {
    res
      .status(400)
      .json({
        status: `failure, there is no contact with ${req.params.contactId} found!`,
      });
  }

  res.json({ contact, status: "success" });
});

router.post("/", async (req, res, next) => {
  const { name, number } = req.body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    number: Joi.string().number().min(7).max(20).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({ status: validationResult.error.details });
  }

  contacts.push({ id: uid(4), name, number });
  res.json({ status: "success" });
});

router.delete("/:contactId", async (req, res, next) => {
  contacts = contacts.filter((contact) => contact.id !== req.params.contactId);
  res.json({ status: "success" });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, number } = req.body;

   const schema = Joi.object({
     name: Joi.string().alphanum().min(3).max(30).required(),
     number: Joi.string().number().min(7).max(20).required(),
   });

   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
     res.status(400).json({ status: validationResult.error.details });
   }

  contacts.forEach((contact) => {
    if (contact.id === req.params.contactId) {
      contact.name = name;
      contact.number = number;
    }
  });

  // const index = contacts.findIndex(
  //   (contact) => contact.id === req.params.contactId
  // );
  // const { name, number } = req.body;
  // const changedContact = { id: uid(4), name, number };
  // contacts.splice(index, 1, changedContact);

  res.json({ contacts, status: "success" });
});

router.patch("/:contactId", async (req, res, next) => {
  const { name, number } = req.body;

   const schema = Joi.object({
     name: Joi.string().alphanum().min(3).max(30).optional(),
     number: Joi.string().number().min(7).max(20).optional(),
   });

   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
     res.status(400).json({ status: validationResult.error.details });
   }

  contacts.forEach((contact) => {
    if (name) {
      contact.name = name;
    }
    if (number) {
      contact.number = number;
    }
  });

  res.json({ contacts, status: "success" });
});

module.exports = router;

//--------------------------------------------

// const schema = Joi.object({
//   username: Joi.string().alphanum().min(3).max(30).required(),

//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

//   repeat_password: Joi.ref("password"),

//   access_token: [Joi.string(), Joi.number()],

//   birth_year: Joi.number().integer().min(1900).max(2013),

//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
// })
//   .with("username", "birth_year")
//   .xor("password", "access_token")
//   .with("password", "repeat_password");

// schema.validate({ username: "abc", birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// // Also -

// try {
//   const value = await schema.validateAsync({
//     username: "abc",
//     birth_year: 1994,
//   });
// } catch (err) {}
