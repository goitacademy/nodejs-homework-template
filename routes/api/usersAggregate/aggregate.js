import express from "express";
import { aggregationController } from "../../../controllers";
import guard from "../../../midllewares/guard";
import roleAccess from "../../../midllewares/roleAccess";
import { Role } from "../../../lib/constants";

const router = express.Router();

router.get("/stats/:id", guard, roleAccess(Role.ADMIN), aggregationController);

export default router;
