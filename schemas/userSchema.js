const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const {Subscription} = require('../helpers/constans')
const { Schema } = mongoose;




  const userSchema = new Schema({
    username: {
      type: String
    },
    email: {
      type: String,
      //required: [true, 'Enter your email'],
      unique: true,
     /* validate(value){
          const reg =/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          return reg.test(String(value).toLowerCase())
        }*/
    },
    password: {
      type: String,
      minlength: 7,
      //maxlength: 15,
      //required: [true, 'Password is required']
    },
    subscription: {
    type: String,
    enum:{ 
        values: [Subscription.FREE, Subscription.PREMIUM, Subscription.PRO],
        message: 'This subscription isn\'t allowed'
    },
    default: Subscription.FREE   
    },
    token: {
      type: String,
      default: null
    }
  },
  { versionKey: false, timestamps: true }
  );

  
  userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR));
  };
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  
  
  const User = mongoose.model('user', userSchema)
  
  module.exports = User



  
  ///////////////////////////////////
    /*userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next()
      this.password = bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR))
      next()
    };*///hook
    /*userSchema.methods.validPassword = async function(password) {
      return await bcrypt.compare(password, this.password);
    };*/