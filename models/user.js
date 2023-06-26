const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: emailRegexp,
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Set password for user'],
        }
    },
    { versionKey: false, timestamps: true }
  );

  userSchema.post('save', handleMongooseError);