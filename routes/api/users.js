import express from "express";
import usersController from "../../controllers/users.js";
import {isEmptyBody, authenticate} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignUpSchema } from "../../models/User.js";

const router = express.Router();
const userSignUpValidate = validateBody(userSignUpSchema);
router.post('/register', isEmptyBody, userSignUpValidate, usersController.register)
router.post('/login', isEmptyBody, userSignUpValidate, usersController.login)
router.get('/current', authenticate, usersController.getCurrent);
router.post('/logout', authenticate, usersController.logout);
export default router;