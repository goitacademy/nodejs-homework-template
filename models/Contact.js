import { Schema, model } from "mongoose";

import {handleSaveError} from './hooks.js'

const contactShema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            match: /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/,
        },
        favorite: {
            type: Boolean,
            default: false
        }
    }, { versionKey: false, timeseries: true });
    
contactShema.post('save', handleSaveError)

export const Contact = model('contact', contactShema)