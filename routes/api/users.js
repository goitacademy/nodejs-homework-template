const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../schemas/user");
require("dotenv").config();
const auth = require("../../middlewares/auth");
const secret = process.env.SECRET;
const { createContact, getAllContacts } = require("../../service/contact");
const Contact = require("../../schemas/contacts");

const invalidatedTokens = new Set();

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (invalidatedTokens.has(token)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Unathorized: Invalid token",
      data: "Unathorized",
    });
  }

  next();
};

router.post("/users/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
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

router.post("/users/registration", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/users/list", auth, (req, res, next) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
});

router.get("/users/logout", validateToken, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  invalidatedTokens.add(token);
  console.log(Array.from(invalidatedTokens));

  res.status(204).json({
    status: "success",
    code: 204,
    message: "Successfully logout",
    data: "success",
  });
});

router.get("/users/current", auth, async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/contacts", validateToken, auth, async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const owner = req.user._id;

  try {
    const result = await createContact({ name, email, phone, favorite, owner });

    res.status(201).json({
      status: "created",
      code: 201,
      data: { cat: result },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/contacts", validateToken, auth, async (req, res, next) => {
  const owner = req.user._id;
  const page = parseInt(req.query.page) || 1; // default page is 1
  const limit = parseInt(req.query.limit) || 20; // default limit is 20

  try {
    const results = await getAllContacts({ owner, page, limit });

    res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    next(error);
  }
});

const getAllContacts2 = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { favorite } = req.query;
    const result = await Contact.find({ owner, favorite });

    console.log("Request query:", req.query);
    console.log("Result:", result);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

router.get("/contacts", auth, getAllContacts2);

router.patch("/users", validateToken, auth, async (req, res, next) => {
  const validSubscriptions = ["starter", "pro", "business"];

  const { subscription } = req.body;

  if (!validSubscriptions.includes(subscription)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid subscription value",
      data: null,
    });
  }

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    user.subscription = subscription;
    await user.save();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Subscription updated successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/randomContacts", validateToken, auth, async (req, res, next) => {
  const { numberOfContacts, owner } = req.body;

  try {
    const randomContacts = generateRandomContacts(numberOfContacts, owner);

    for (const contact of randomContacts) {
      await createContact(contact);
    }

    res.status(201).json({
      status: "created",
      code: 201,
      data: { message: `${numberOfContacts} random contacts generated.` },
    });
  } catch (error) {
    next(error);
  }
});

function generateRandomContacts(count, owner) {
  const randomContacts = [];
  for (let i = 1; i <= count; i++) {
    const contact = {
      name: `Contact ${i}`,
      email: `contact${i}@example.com`,
      phone: "123-456-7890",
      favorite: Math.random() < 0.5,
      owner: owner,
    };
    randomContacts.push(contact);
  }
  return randomContacts;
}

module.exports = router;
