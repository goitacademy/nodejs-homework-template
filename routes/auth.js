import { Router } from "express";
import controllers from "./controllers/auth";
import guard from "../../midllewares/guard";
import limiter from "../../midllewares/rate-limit";

const router = Router();

router.post("/signup", limiter(15 * 60 * 1000, 2), controllers.signup);
router.post("/login", controllers.login);
router.post("/logout", guard, controllers.logout);
router.get("/current", guard, controllers.current);

export default router;
