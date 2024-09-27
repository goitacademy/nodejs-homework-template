// const fs = require('fs/promises')
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userRolesEnum = require('../constants/userRolesEnum');

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Duplicated email...'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.USER,
  },
}, {
  timestamps: true,
  versionKey: false,
});



//Pre save mongoose hook. Fires on create and save

contactSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next
});

/**
 * Custom mongoose method to validate password. Will use in future.
 * @param {string} candidate
 * @param {string} hash
 * @returns {Promise<boolean>}
 */

contactSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);


const Contact = model('Contact', contactSchema);

module.exports = Contact;

// const listContacts = async () => { }

// const getContactById = async (contactId) => { }

// const removeContact = async (contactId) => { }

// const addContact = async (body) => { }

// const updateContact = async (contactId, body) => { }


// // const salt = await bcrypt.genSalt(10);

// // const hashedPassword = await bcrypt.hash(req.body.password, salt);

// // const isPasswordMatch = await bcrypt.compare('Password$1234, hashedPassword');
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
