import express from "express";
import aggregation from "../../../controllers/usersAggregate/usersAggregate";
import guard from "../../../midllewares/guard";
import roleAccess from "../../../midllewares/roleAccess";
import { Role } from "../../../lib/constants";

const router = express.Router();

router.get("/stats/:id", guard, roleAccess(Role.ADMIN), aggregation);

export default router;
