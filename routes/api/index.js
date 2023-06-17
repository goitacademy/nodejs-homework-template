const Joi = require("joi").extend(require("joi-phone-number"));
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
  favorite: Joi.boolean().required(),
});
const favSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User, userRegister } = require("../../models/users");
const secret = "ciekaweczyzadziala";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Sign up
router.post("/users/register", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "User already exists!",
    });
  }
  const newUser = await userRegister({ email, password });

  res.json(newUser);
});

// Sign in

router.post("/users/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
});

// Get contacts
router.get("/contacts", auth, async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json({ message: contacts });
});

// Get contacts with id
router.get("/contacts/:contactId", auth, async (req, res, next) => {
  try {
    const foundContact = await getContactById(req.params.contactId);

    if (foundContact) {
      res.status(200).json(foundContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Add contact
router.post("/contacts", auth, async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const add = await addContact(req.body);
      res.status(201).json({ message: add });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete contact
router.delete("/contacts/:contactId", auth, async (req, res, next) => {
  try {
    const response = await removeContact(req.params.contactId);
    if (response) {
      res.json({ message: `Contact ${response.name} deleted` });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Update contact
router.put("/contacts/:contactId", auth, async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const updatedContact = await updateContact(
        req.params.contactId,
        req.body
      );

      if (updatedContact) {
        return res.status(200).json({ message: updatedContact });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Update status
router.patch("/contacts/:contactId/favorite", auth, async (req, res, next) => {
  try {
    const { error } = favSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    const { contactId } = req.params;
    const { favorite = false } = req.body;

    const contactStatus = await updateStatusContact(contactId, { favorite });
    if (contactStatus) {
      return res.status(200).json({ message: `Contact updated` });
    } else {
      return res.status(400).json({ message: `Not found` });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
