const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('strictQuery', false);

const { HOST_URI } = process.env;

(async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error while connecting to mongodb', error.message);
    process.exit(1);
  }
})();

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
  },
  { versionKey: false }
);
const Contacts = mongoose.model('Contacts', schema);

module.exports = {
  Contacts,
};
