const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Joi = require('joi');

const userSchema = Schema(
   {
      password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null
      },
      avatarURL: {
        type: String,
        required: true,
      },
    }, {versionKey: false, timestamps: true});


    const userRegisterSchema = (req, res, next) => {
      const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().pattern(emailRegexp).required(),
        
    });
  
    const validationResult = schema.validate(req.body);
  
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message,
      });
    }
  
    next();
  };


  const userLoginSchema = (req, res, next) => {
    const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
      
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }

  next();
};


    userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    userSchema.methods.coparePassword = function (password) {
      return bcrypt.compareSync(password, this.password);
    }

    const User = model("users", userSchema);

    module.exports = {
      User,
      userRegisterSchema,
      userLoginSchema
    }