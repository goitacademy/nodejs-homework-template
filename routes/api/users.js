import { Router } from "express";

import registerUser from "../../controllers/users/signupRouters.js";
import loginUser from "../../controllers/users/loginRouters.js";


const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
