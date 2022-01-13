import express from "express";
import { aggregationController, uploadAvatar } from "../../../controllers";
import guard from "../../../midllewares/guard";
import { upload } from "../../../midllewares/upload";
import roleAccess from "../../../midllewares/roleAccess";
import { Role } from "../../../lib/constants";

const router = express.Router();

router.get("/stats/:id", guard, roleAccess(Role.ADMIN), aggregationController);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

export default router;
