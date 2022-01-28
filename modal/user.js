import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { role } from '../lib/constants.js';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import {randomUUID} from 'crypto';

const userSchema = new Schema({    
        name: {
          type: String,
          default: 'Guest',
        },
        email: {
          type: String,
          required: [true, 'Set email for user'],
          unique: true,
          validate(value){
              const re = /\S+@\S+\.\S+/
              return re.test(String(value).trim().toLowerCase())
          }
        },
        password: {
            type: String,
            required: [true, 'Set password for user'],
         },
         role: {
             type: String,
             enum: {
                 values: Object.values(role),
                 message: 'role  is not allowed'
             },
             default: role.USER
         },
         token: {
             type: String,
             default: null,
         },
         avatar:{
             type: String,
             default: function(params) {
                return gravatar.url(this.email, { s: 250 }, true) 
             },
        
         },
         idAvatarCloud:{
            type: String,
            default: null,
        },
        isVerify: {
            type: Boolean,
            default: false
        },
        verifyTokenEmail: {
            type: String,
            default: randomUUID(),
        }
      
},{
    versionKey: false,
    timestamps: true,
    toJSON:{virtuals: true,//virtual dada in json
        transform: function(doc, ret){
            delete ret._id     //delete string '_id'
            return ret
        }
    },
    toObject: {virtuals: true}   //virtual date in object consoleLog()
});

userSchema.pre('save', async function (next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
});

userSchema.methods.isValidPassword = async function(password) {
    // console.log (await bcrypt.compare(password, this.password));
    return await bcrypt.compare(password, this.password)
}


const User = model('user', userSchema);



export default User;