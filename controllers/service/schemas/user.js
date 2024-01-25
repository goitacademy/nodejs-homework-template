import mongoose from "mongoose";

const {Schema, model} = mongoose;

const users = new Schema(
     {
    name: {
             type: String,
        minLenght: 3,
        maxLenght: 32,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
)

const User = model('user', users, 'contacts');

 export {User}