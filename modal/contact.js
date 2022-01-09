import mongoose from 'mongoose';
const { Schema, model,  SchemaTypes } = mongoose;
import {MIN_AGE, MAX_AGE } from '../lib/constants.js';

const contactSchema = new Schema({    
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        age: {
            type: Number,
            min: MIN_AGE,
            max: MAX_AGE,
            default: null,
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
        owner:{
          type:SchemaTypes.ObjectId,
          ref: 'user',
          required: true,              //ID from collection Users
      }    
},{
    versionKey: false,
    timestamps: true,
    toJSON:{virtuals: true,
        transform: function(doc, ret){
            delete ret._id    
            return ret
        }
    },
    toObject: {} 
});

contactSchema.virtual('status').get(function(){ 
    if (this.age >= 40) {
        return 'old'
    }
    return 'young'
})

const Contact = model('contact', contactSchema);

export default Contact
 