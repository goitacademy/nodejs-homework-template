const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const userSchema = new Schema(
    {
    },
    { versionKey: false, timestamps: true }
  );