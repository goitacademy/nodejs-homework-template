import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/controllers/contacts";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({ extended: false })); // forms submit

app.use("/api/contacts", contactsRouter.routerListContacts);
app.use("/api/contacts", contactsRouter.routerGetContactById);
app.use("/api/contacts", contactsRouter.routerRemoveContact);
app.use("/api/contacts", contactsRouter.routerAddContact);
app.use("/api/contacts", contactsRouter.routerUpdateContact);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
