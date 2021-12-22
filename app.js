import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRoutes from "./routes";
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/controllersContacts", contactsRoutes.routerListContacts);
app.use("/controllersContacts", contactsRoutes.routerGetContactById);
app.use("/controllersContacts", contactsRoutes.routerPostContact);
app.use("/controllersContacts", contactsRoutes.routerDeleteContact);
app.use("/controllersContacts", contactsRoutes.routerPutContact);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
