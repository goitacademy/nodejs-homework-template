import express from "express";
import {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateById,
  updateFavorite,
} from "../../controllers/controllers.js";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", createContact);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

router.patch("/:contactId", updateFavorite);

// router.get("/filtr?favorite=", async (req, res, next) => {
//   const result = req.query;
//   res.json({ message:"col" });
// });

export { router };
