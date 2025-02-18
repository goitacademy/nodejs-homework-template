import express from "express";
import logger from "morgan";
import cors from "cors";
import usersRouter from "./routes/api/users.js";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
