const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);
// mongoose.set("debug", true); // enable logging

const { HOST_URI } = process.env;
const app = require("./app");

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Mongodb connection successful!");

    // // Schema
    // const schema = mongoose.Schema(
    //   {
    //     name: {
    //       type: String, // mongoose.Types.String,
    //       required: [true, "Set name for contact"],
    //       // enum: ["Viktor", "Volodymyr"],
    //       unique: true,
    //       minLength: [5, "It is too short"],
    //     },
    //     email: {
    //       type: String,
    //     },
    //     phone: {
    //       type: String,
    //     },
    //     favorite: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     // year: {
    //     //   type: Number,
    //     //   min: [4, "It is too short!"],
    //     //   // match: /\d{4}/,
    //     //   required: true,
    //     // },
    //   },
    //   {
    //     versionKey: false,
    //     timestamps: true,
    //   }
    // );

    // // Model (Class)
    // const Contact = mongoose.model("contact", schema);

    // save new contact into mongodb
    // const saveNewContact = await Contact.create({
    //   name: "Volodymyr",
    //   email: "v.khoptynec@gmail.com",
    //   phone: "(075) 524-12523",
    //   // year: 1979,
    // });
    // console.log("create new contact", saveNewContact);

    // read from mongodb
    // const contacts = await Contact.find({});
    // console.log("all contacts", contacts);

    // read using filter from mongodb
    // const contacts = await Contact.find({ name: "Yurii Mashyka" });
    // console.log("contacts by filter name", contacts);

    // find one from mongodb
    // const contact = await Contact.findOne({ name: "Yurii Mashyka" });
    // console.log("find one contact", contact);

    // find one from mongodb
    // const contact = await Contact.findOne({ _id: "63c0767686d8c61ae93f868c" });
    // console.log("find one contact", contact);

    // find by id from mongodb
    // const contact = await Contact.findById("63c0767686d8c61ae93f868c");
    // console.log("find one contact", contact);

    // update mongodb
    // const contact = await Contact.findOne({ _id: "63c0767686d8c61ae93f868c" });
    // contact.name = "updated name";
    // await contact.save();
    //** */
    // const contact = await Contact.findByIdAndUpdate(
    //   "63c0767686d8c61ae93f868c",
    //   { name: "changed name 2" },
    //   { new: true }
    // );
    // console.log("update name", contact);

    //remove
    // const contact = await Contact.findByIdAndRemove("63c0767686d8c61ae93f868c");
    // console.log("removed success", contact);

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
