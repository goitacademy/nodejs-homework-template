const {Schema, model} = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const Joi = require('joi');

const phoneRegexp = /^\(\d{3}[- _]*\) \d{3}-\d{4}$/;

const contactSchema = new Schema ({
    name: {type: String,
           required: [true, 'Set name for contact'],
        },
    email: {type: String,
           required: true,
        },
    phone: {type: String,
           match: phoneRegexp, 
           required: true, 
    },
    favorite: {
        type: Boolean,
        default: false,
      },
    owner:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true,
    },
}, {versionKey:false, timestamps:true});

const updateFavorite =Joi.object({
    favorite:Joi.boolean().required(),
})
 
const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    // favorite: Joi.boolean(),
})

contactSchema.post('save', handleMongooseError);

const schema = {
    addSchema,
    updateFavorite,
}

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schema,
}

