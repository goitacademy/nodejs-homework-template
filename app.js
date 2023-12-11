const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

<<<<<<< HEAD
const multer = require("multer");

=======
>>>>>>> parent of df708c3 (update 1)
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/contacts", contactsRouter);
app.use("/users", usersRouter);
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, "public")));
=======
>>>>>>> parent of df708c3 (update 1)

module.exports = app;
