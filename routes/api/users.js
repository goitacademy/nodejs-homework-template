const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const gravatar = require("gravatar");

const User = require("../../models/user");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();
const avatarsDir = path.join(__dirname, "../../public/avatars");

// Walidacja rejestracji i logowania
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// 🔹 Rejestracja użytkownika
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true); // Domyślny awatar

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/avatars", auth, upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { path: tmpPath } = req.file;
  console.log("Uploaded file path:", tmpPath); // Dodajemy log ścieżki do pliku

  // Sprawdzamy, czy plik istnieje przed przetworzeniem
  try {
    const fileExists = fs.existsSync(tmpPath);
    if (!fileExists) {
      console.log("Uploaded file does not exist");
      return res.status(400).json({ message: "File does not exist" });
    }
    console.log("File exists. Proceeding with avatar processing.");

    const newAvatarName = `${req.user._id}-${Date.now()}.jpg`;
    const newAvatarPath = path.join(avatarsDir, newAvatarName);

    // 🔸 Przetwarzanie obrazu za pomocą Jimp
    try {
      const image = await Jimp.read(tmpPath); // Próba wczytania obrazu
      console.log("Image loaded successfully");

      await image.resize(250, 250).writeAsync(newAvatarPath);
      console.log(`Image resized and saved to ${newAvatarPath}`);

      // 🔸 Usunięcie pliku z tmp
      await fs.unlink(tmpPath);
      console.log("Temporary file deleted");

      // 🔸 Aktualizacja użytkownika w bazie danych
      const avatarURL = `/avatars/${newAvatarName}`;
      await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
      console.log("User avatar updated");

      res.status(200).json({ avatarURL });
    } catch (error) {
      console.error("Error processing avatar with Jimp:", error);
      res.status(500).json({ message: "Error processing avatar with Jimp" });
    }
  } catch (error) {
    console.error("Error checking file existence:", error);
    res.status(500).json({ message: "Error checking file existence" });
  }
});

// 🔹 Logowanie użytkownika
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Generowanie tokena JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Przypisanie tokena do użytkownika
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Wylogowanie użytkownika
router.get("/logout", auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Obecny użytkownik
router.get("/current", auth, (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.status(200).json({ email, subscription, avatarURL });
});

// 🔹 Aktualizacja subskrypcji użytkownika
router.patch("/", auth, async (req, res) => {
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription value" });
  }

  try {
    req.user.subscription = subscription;
    await req.user.save();
    res.status(200).json({ subscription: req.user.subscription });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
