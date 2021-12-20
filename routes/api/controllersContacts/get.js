import express from "express";
import { listContacts } from "../../../model/index";

const getRouter = express.Router();

getRouter.get("/", async (_req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

export default getRouter;
