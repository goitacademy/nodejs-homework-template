// require('dotenv').config();

// const mongoose = require('mongoose');

// const url = process.env.DB_URI;
// console.log(url);

// async function main() {
//     await mongoose.connect(process.env.DB_URI)
//     .then(() => {
//         console.log("Database connection successful");
//         })
// // Create a new contact

//         const contactSchema = new mongoose.Schema({
//                 name: {
//                   type: String,
//                   required: [true, 'Set name for contact'],
//                 },
//                 email: {
//                   type: String,
//                 },
//                 phone: {
//                   type: String,
//                 },
//                 favorite: {
//                     type: Boolean,
//                     default: false,
//                 }
//         });

//         const Contact = mongoose.model("contacts", contactSchema)
//         // console.log( Contact,  "This is model contact");
//         const res = await Contact.create({
//             favorite: {
//                 type: Boolean,
//                 default: false,
//             }
//         });
//         console.log(res);
// }

//     main().catch(error => {
//         console.error(error);
//         process.exit(1);
//     });








    
// // mongoose
// //     .connect(url)
// //     .then(() => {
// //         console.log("Database connection successful");
// //         process.exit(0);})
// //     .catch(err => {
// //         console.error(err);
// //         process.exit(1);
// //     });
