const express = require("express");
const morgan = require("morgan");
const logger = require(morgan);
require("dotenv").config();

const app = express();
const { connectMongo } = require("./scr/db/connection");
const contactsRouter = require("./src/routers/contactsRouter");
const { errorHandler } = require("./src/helpers/apiHelpers");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use(errorHandler);

const start = async () => {
    try {
        await connectMongo();
        app.listen(process.env.PORT, (err) => {
            if (err) console.error("Error at server:", err);
            console.log(`Server running. Use our API on port: ${process.env.PORT}`);
        });
} catch (error) {
    console.log(error.message);
  }
};

start();

