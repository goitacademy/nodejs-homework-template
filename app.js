import express from "express";
import logger from "morgan";
import cors from "cors";
import {
  createRouter,
  getByIdRouter,
  updateRouter,
  deleteRouter,
  listContactsRouter,
  patchContactRouter,
} from "./routes/contacts";
import {
  registrationRouter,
  loginRouter,
  logoutRouter,
  currentRouter,
} from "./routes/users";
import { HttpCode } from "./lib/constants";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({ extended: false })); // forms

app.use("/users", registrationRouter);
app.use("/users", loginRouter);
app.use("/users", logoutRouter);
app.use("/users", currentRouter);

app.use("/contacts", listContactsRouter);
app.use("/contacts", updateRouter);
app.use("/contacts", createRouter);
app.use("/contacts", deleteRouter);
app.use("/contacts", getByIdRouter);
app.use("/contacts", patchContactRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});
export default app;
