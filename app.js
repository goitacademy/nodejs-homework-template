import express from "express";
import logger from "morgan";
import cors from "cors";

import {
  routerListContacts,
  routerGetContactById,
  routerPostContact,
  routerDeleteContact,
  routerPutContact,
  routerPatchContact,
} from "./routes";

import authRouter from "./routes/auth";
import { HttpCode } from "./lib/constants";
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/controllersContacts", routerListContacts);
app.use("/controllersContacts", routerGetContactById);
app.use("/controllersContacts", routerPostContact);
app.use("/controllersContacts", routerDeleteContact);
app.use("/controllersContacts", routerPutContact);
app.use("/controllersContacts", routerPatchContact);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
