const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./contacts/contacts.router");
const { usersRouter } = require("./users/users.router");

function createApp() {
  const app = express();

  const formatsLogger = app.get("env") === "development" ? "dev" : "short";

  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());

  app.use("/api/contacts", contactsRouter);
  app.use("/users", usersRouter);

  app.use(express.static("public"));

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
    console.log("APP.JS NOT FOUND");
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });

  return app;
}

// W przypadku, gdy aplikacja jest uruchamiana normalnie, np. na serwerze produkcyjnym, możemy uruchomić serwer.
// Jednakże w testach nie chcemy faktycznie uruchamiać serwera, więc nie będziemy go uruchamiać tutaj.
// Zamiast tego, będziemy eksportować funkcję createApp, która tworzy i konfiguruje aplikację Express.
// Serwer będzie uruchamiany tylko w plikach uruchamiających aplikację, takich jak server.js.

module.exports = createApp;
