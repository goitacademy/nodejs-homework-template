import { Router } from "express";
import { router as authRouter } from "./authRouter.js";
import { router as contactsRouter } from "./contacts.js";

const router = Router();

router.use("/users", authRouter);
router.use("/contacts", contactsRouter);

export default router;
