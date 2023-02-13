const mongoose = require('mongoose');

// Schema

const schema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'],},
    email: {
      type: String,
    },
    phone: { type: String, match: /\d{7}/, },
    favorite: {type: Boolean, default: false,},
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
 

  { versionKey: false, timestamps: true }
);

// Model (Class)

const Contact = mongoose.model('contact', schema);

module.exports ={
    Contact,
}

// async function main() {
//   try {
//     // TO DO check if needed
//     await mongoose.connect(HOST_URI);

//     console.log('Connected to mongodb!');

//     // Schema
//     const schema = mongoose.Schema(
//       {
//         name: { type: String, required: true, unique: true, minLength: [3, "it is too short"] },
//         email: { type: String,
//           // anum: ['action', 'drama', 'comedy'], require: true
//          },
//         phone: { type: String, match: /\d{7}/,},
//         favorite: {type: Boolean, default: false,}
//       },
//       { versionKey: false, timestamps: true }
//     );

//     // Model (Class)
//     const Contact = mongoose.model('contact', schema);

//     // ==== save new movie into db ====
//     const savedContact = await Contact.create({
//       name: 'The good father 8',
//       email: ' 3232232@gmail.com',
//       phone: "1234567",
//     });
//     console.log('create new movie', savedContact);

//     // ==== read all from db ====
//     // const contacts = await Contact.find({});
//     // console.log("contacts: ", contacts);

//     // ==== read using from db ====
//     // const contacts = await Contact.find({name: 'new Contact'});
//     // console.log("contacts: ", contacts);

//     // ==== find one ====
//     // const contact = await Contact.findOne({name: 'new Contact'});
//     // console.log("contact: ", contact);

//     // ==== find by id ====
//     // const contact = await Contact.findOne({_id: '63e662b49cff7686e6c5c136'});
//     // const contact = await Contact.findById('63e662b49cff7686e6c5c136');
//     // console.log("contact: ", contact);

//     // ==== update ====
//     // const contact = await Contact.findByIdAndUpdate(
//     //   '63e662b49cff7686e6c5c136',
//     //   { name: 'updated name 3' },
//     //   { new: true }
//     // );
//     // console.log('updated contact: ', contact);

//     // ==== remove ====
//     // const contact = await Contact.findByIdAndRemove('63e662b49cff7686e6c5c136');
//     // console.log('deleted contact: ', contact);
//   } catch (error) {
//     console.error('Error:', error.message);
//     process.exit(1);
//   }
// }

// =========================
