import { loginUser } from "../../controllers/users/loginUser.js";
import { loginExistingUser } from "../../controllers/users/loginExistingUser.js";
import { logoutExistingUser } from "../../controllers/users/logoutExistingUser.js";
import { logoutUser } from "../../controllers/users/logoutUser.js";
import { registerExistingUser } from "../../controllers/users/registerExistingUser.js";
import { registerNewUser } from "../../controllers/users/registerNewUser.js";
import { getExistingUser } from "../../controllers/users/getExistingUser.js";
import { getCurrentUser } from "../../controllers/users/getCurrentUser.js";
import verifyToken from "./authMiddleware.js";
import express from "express";

const router = express.Router();

// Rejestracja użytkownika
router.post("/signup", registerNewUser);
router.post("/signup", registerExistingUser);

// Logowanie użytkownika
router.post("/login", loginUser);
router.post("/login", loginExistingUser);

// Pobranie danych bieżącego użytkownika
router.get("/current", verifyToken, getCurrentUser);
router.get("/current", verifyToken, getExistingUser);

// Wylogowanie użytkownika
router.get("/logout", verifyToken, logoutExistingUser);
router.get("/logout", verifyToken, logoutUser);
export default router;
