import express from "express";
import logger from "morgan";
import cors from "cors";
import routers from "./controllers/contacts";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //json
app.use(express.urlencoded({ extended: false })); // forms

app.use("/contacts", routers.updateRouter);
app.use("/contacts/", routers.createRouter);
app.use("/contacts/", routers.deleteRouter);
app.use("/contacts/", routers.getByIdRouter);
app.use("/contacts", routers.listContactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
