import { Router } from "express";

import registerUser from "../../controllers/users/signupRouters.js";


const router = Router();


router.post("/register", registerUser);


export default router;
