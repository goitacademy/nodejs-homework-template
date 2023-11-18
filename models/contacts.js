// const mongoose = require('mongoose');

// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Set name for contact'],
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Contact = mongoose.model('Contact', contactSchema);

// const listContacts = async () => {
//   try {
//     const contacts = await Contact.find();
//     return contacts;
//   } catch (error) {
//     console.error('Error reading contacts from database:', error.message);
//     throw error;
//   }
// };

// module.exports = {
//   Contact,
//   listContacts,
// };
