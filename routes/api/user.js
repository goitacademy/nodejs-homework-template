const express = require("express");
const ctrlUser = require("../../controllers/user");
const router = express.Router();

// Trasy związane z użytkownikami
router.post("/signup", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.get("/logout", ctrlUser.auth, ctrlUser.logout);
router.get("/current", ctrlUser.auth, ctrlUser.current);
router.patch("/", ctrlUser.updateSub);

// Trasa do aktualizacji awatara
router.patch("/avatars", ctrlUser.auth, ctrlUser.updateAvatar); // Dodanie trasy do aktualizacji awatara

// Trasa do weryfikacji emaila
router.get("/verify/:verificationToken", ctrlUser.verifyEmail);

module.exports = router;
