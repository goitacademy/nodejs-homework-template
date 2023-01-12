/* eslint-disable indent */
const express = require("express");
const cors = require("cors");
// const contactsRouter = require("./routes/api/contacts");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();

const { HOST_URI } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log("API Error:", err.message);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line require-jsdoc
async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    const schema = mongoose.Schema(
      {
        name: {
          type: String,
          minlength: 2,
          maxlength: 30,
          required: [true, "Set name for contact"],
          unique: true,
        },
        email: { type: String, unique: true },
        phone: {
          type: String,
          unique: true,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      },
      {
        versionKey: false,
        timestamps: true,
      }
    );

    const Contact = mongoose.model("contact", schema);
    // const savedContact = await Contact.create({
    //   name: "Viktor",
    //   phone: "548462315462",
    //   favorite: true,
    // });

    // console.log(savedContact);

    // const contacts = await Contact.find({ name: "Viktor" });
    // console.log(contacts);

    // const contacts = await Contact.findOne({ name: "Viktor" });
    // console.log(contacts);

    // const contacts = await Contact.findByIdAndRemove(
    //   "63c079506fb812e24c36a5f7"
    // );
    // console.log(contacts);
  } catch (error) {
    console.error("Error while connecting to mongoDb", error.massage);
    process.exit(1);
  }
}

main()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
