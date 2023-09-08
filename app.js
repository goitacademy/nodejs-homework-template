import express from "express";
import logger from "morgan";
import cors from "cors";

import router from "./routes/api/contacts-router.js";

const app = express(); // app web-server

// app.get("/", (req, res) => {
//   res.send("<h1>Home page</h1>");
// });
// app.get("/contacts", (req, res) => {
//   console.log(req.url);
//   console.log(req.method);
//   res.send("<h1>Contacts</h1>");
// });

// app.listen(3000, () => console.log("Server listening on port 3000"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
