// const contacts = require("./models/contacts.json");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
// import express from "express";
// import logger from "morgan";
// import cors from "cors";
// import contactsRouter from "./routes/api/contacts";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const functions = require("./models/contacts");
// import * as functions from "./models/contacts";
// console.log(functions);

app.get("/", async (request, response) => {
  const contacts = await functions.listContacts();
  response.send(contacts);
});

app.get("/:id", async (request, response) => {
  const { id } = request.params;
  const contact = await functions.getContactById(id);
  response.send(contact);
});

app.post("/", async (request, response) => {
  console.log(request);
  // const { name, email, phone } = request.body;
  // const contact = await functions.addContact({ name, email, phone });
  // response.send(contact);
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
