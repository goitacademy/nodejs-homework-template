import express from "express";
import auth from "../../middleware/auth.js";
import pagination from "../../middleware/pagination.js";
import usersController from "../../controllers/users.js";

const router = express.Router();

router.get("/", auth, pagination(), usersController.getAll);

router.get("/current", auth, usersController.getCurrent);

router.get("/:id", auth, usersController.getById);

router.post("/signup", usersController.register);

router.post("/login", usersController.login);

router.post("/logout", auth, usersController.logout);

router.patch("/", auth, usersController.update);

router.patch("/subscription", auth, usersController.updateSubscription);

router.delete("/", auth, usersController.remove);

export default router;
