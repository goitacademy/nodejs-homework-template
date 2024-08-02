const express = require("express");
const router = express.Router();
const { updateAvatar, verifyUser, resendVerificationEmail } = require("../controllers/userController");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

// Endpoint do aktualizacji avatara
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

// Endpoint do weryfikacji emaila
router.get("/verify/:verificationToken", verifyUser);

// Endpoint do ponownego wysyłania emaila weryfikacyjnego
router.post("/verify", resendVerificationEmail);

// Endpoint rejestracji użytkownika
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const verificationToken = uuidv4();
    const user = new User({ email, password, verificationToken });

    await user.save();

    const msg = {
      to: email,
      from: "email@example.com",
      subject: "Verify your email",
      text: `Click the following link to verify your email: http://your_domain.com/users/verify/${verificationToken}`,
      html: `<p>Click the following link to verify your email: <a href="http://your_domain.com/users/verify/${verificationToken}">Verify Email</a></p>`,
    };

    await sgMail.send(msg);

    res.status(201).json({ message: "User registered, verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
