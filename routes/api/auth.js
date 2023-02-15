const express = require("express");
const { registerUser } = require("../../models/auth/user");
const { registerSchema, loginSchema } = require("../../models/auth/userSchema");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "Missing required name field.", er: `${error}` });
    } else {
      const newUser = await registerUser(req);
      res.status(201).json(newUser);
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json("Conflict");
    } else {
      next(error);
    }
  }
});

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const contact = await getContactById(req, res);
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = schemas.addSchema.validate(req.body);
//     if (error) {
//       res
//         .status(400)
//         .json({ message: "Missing required name field.", er: `${error}` });
//     } else {
//       const newContact = await addContact(req, res);
//       res.status(201).json(newContact);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const message = await removeContact(req, res);
//     res.json(message);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = schemas.addSchema.validate(req.body);

//     if (error) {
//       res.status(400).json({ message: "Missing required name field." });
//     } else {
//       const updatedContact = await updateContact(req, res);
//       res.json(updatedContact);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/:contactId/favorite", async (req, res, next) => {
//   try {
//     const { error } = schemas.updateFavoriteSchema.validate(req.body);
//     if (error) {
//       res.status(400).json({ message: "Missing field favorite." });
//     } else {
//       const updateContact = await updateFavorite(req, res);
//       res.json(updateContact);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
