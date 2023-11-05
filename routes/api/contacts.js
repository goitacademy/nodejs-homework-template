import express from "express";
import {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateById,
  updateFavorite,
} from "../../controller/controllers.js";


const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", createContact);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

router.patch("/:contactId", updateFavorite);


export { router };
