import express from "express";
import { signup, login, logout, getCurrentUser } from "#controllers/users/index.js";
import { checkToken } from "#middleware/auth.js";
export const routerUsers = express.Router();

routerUsers.post("/signup", signup);
routerUsers.post("/login", login);
routerUsers.post("/logout", checkToken, logout);
routerUsers.get("/current", checkToken, getCurrentUser);
