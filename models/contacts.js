// models\contacts.js
const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String,
      // match: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null
    },
    // temporaryKey: {
    //   type: String,
    //   default: null,
    // },
    // phone: {
    //   type: String,
    // },
    // favorite: {
    //   type: Boolean,
    //   default: false,
    // },
    active: {
      type: Boolean,
      default: null
    },
    // rol: {
    //   type: String,
    //   enum: ["ADMIN", "SELLER", "DELIVER"],
    // },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Contact'
    // }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String,
      // match: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      required: [true, 'Email is required'],
      unique: true
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // password: {
    //   type: String,
    //   required: [true, 'Password is required']
    // },
    // subscription: {
    //   type: String,
    //   enum: ['starter', 'pro', 'business'],
    //   default: 'starter'
    // },
    // temporaryKey: {
    //   type: String,
    //   default: null,
    // },
    // rol: {
    //   type: String,
    //   enum: ["ADMIN", "SELLER", "DELIVER"],
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Contact'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

// "Contact" name is Collection, schema is Document
const User = mongoose.model('User', UserSchema)
const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
  User,
  Contact,
}
