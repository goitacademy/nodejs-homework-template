import express from "express";
import {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateById,
  updateFavorite,
} from "../../controller/controllers.js";
import { login, registration } from "../../controller/userControllers.js";

const router = express.Router();

router.get("/contacts", getAllContacts);

router.get("/contacts/:contactId", getById);

router.post("/contacts", createContact);

router.delete("/contacts/:contactId", deleteById);

router.put("/contacts/:contactId", updateById);

router.patch("/contacts/:contactId", updateFavorite);

router.post("/users/signup", registration);

router.post("/users/login", login);
export { router };
