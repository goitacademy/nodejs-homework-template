import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import "./config/passport.js";
import usersRouter from "./routes/api/users.js";
import contactsRouter from "./routes/api/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({
    status: 404,
    statusText: "Not Found",
    data: {
      message: "Error",
    },
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({
    status: 500,
    statusText: "Internal Server Error",
    data: {
      message: err.message,
    },
  });
});

export default app;
