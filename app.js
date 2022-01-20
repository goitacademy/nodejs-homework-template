import express from "express";
import logger from "morgan";
import cors from "cors";
import routers from "./routes/contacts";
import usersRouter from "./routes/auth";
import { HttpCode } from "./lib/constants";
import helmet from "helmet";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static(process.env.FOLDER_FOR_AVATARS));
app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({ extended: false })); // forms

app.use("/contacts", routers.updateRouter);
app.use("/contacts/", routers.createRouter);
app.use("/contacts/", routers.deleteRouter);
app.use("/contacts/", routers.getByIdRouter);
app.use("/contacts/", routers.patchContactRouter);

app.use("/api/users", usersRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR
  const status =
    statusCode === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error'
    res.status().json({
      status: status,
      code: statusCode,
      message: err.message,
    })
});
export default app;