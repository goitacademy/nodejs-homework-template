const { Schema, model} = require('mongoose');
const {handlerError} = require('../utils')


const userSchema = new Schema({
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
        default: null,
        }
    },
    {
    versionKey: false,
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});

userSchema.post("save", handlerError);

const User = model('user', userSchema);

module.exports = User;