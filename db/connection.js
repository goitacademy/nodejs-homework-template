const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const URL = process.env.MONGO_URL;
const Schema = mongoose.Schema;

const connectMongo = async () => {
  const contacts = new Schema({
    name: {
      type: String,
      minlength: 2,
      maxlength: 7,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 12,
      unique: true,
    },
    phone: {
      type: String,
      minlength: 2,
      maxlength: 12,
      required: [true, "Phone is required"],
      unique: true,
    },
    favorite: Boolean,
  });
  const Contacts = mongoose.model("contact", contacts);
  // const client = await mongoose.connect(URL, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  // });
  // // const client = await MongoClient.connect(URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // const db = client.db();
  // collection.Contacts = db.collection("contacts");
};
module.exports = { connectMongo };
