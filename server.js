// const app = require('./app');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config();


// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// });

const { HOST_URI } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful!');

    const shcema = mongoose.Schema(
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
      {
        versionKey: false,
        timestamps: true,
      }
    );
    const Contact = mongoose.model('contacts', shcema);

    // const savedContact = await Contact.create({
    //   name: "new contact",
    //   email: "aaa@a.com",
    //   phone: "1111111111",
    //   favorite: true,
    // });
    // console.log('create new contact', savedContact);

    // const contacts = await Contact.find({})
    // console.log('contacts', contacts);

    // const contacts = await Contact.findOne({name: "Thomas Lucas"})
    // console.log('contacts', contacts);

    // const contacts = await Contact.findById('63c01bd36bcd58e8d4254bbd');
    // console.log('contacts', contacts);

    // const contacts = await Contact.findByIdAndUpdate('63c01bd36bcd58e8d4254bbd', {
    //   name: 'new new'
    // },
    //   { new: true }
    // );
    // console.log('contacts', contacts);

    const contacts = await Contact.findByIdAndRemove('63c01bd36bcd58e8d4254bbd');
    console.log('contacts', contacts);
  } catch (error) {
    console.error('Error while connecting to database', error.message); 
    process.exit(1)
  }
}
main();