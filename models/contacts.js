const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("contact", schema);

module.exports = { Contacts };

// const saveContacts = await Contacts.create({
//   name: "GoodluckTogether",
//   email: "Hello@gmai.com",
//   phone: 3602009758,
// });
// console.log("saveContacts :", saveContacts);

// /

// const fines = await Contacts.find({});
// console.log("fines :", fines);

// const fines = await Contacts.find({ name: "Vasia" });
// console.log("fines :", fines);

// const fine = await Contacts.findOne({ name: "Vasia" });
// console.log("fine :", fine);

// const fine = await Contacts.findOne("6425365ce5d509b9ff377629");
// fine.name = "updateName";
// await fine.save();

// const fine = await Contacts.findByIdAndUpdate(
//   "642537572accb7dc865323dc",
//   {
//     name: "updateName2....",
//   },
//   { new: true }
// );
// console.log("fine :", fine);

// const fine = await Contacts.findByIdAndRemove("64253746da7bd1c69af403f8");
// console.log("fine :", fine);
// console.log("fine :", fine);
