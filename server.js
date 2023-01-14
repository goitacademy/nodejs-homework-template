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

    //**Examples */

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
