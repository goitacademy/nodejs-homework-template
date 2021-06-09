const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
    {
        name:{ 
            type: String,
            required: [true, 'Set name for contact']
            },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        favorite:{
            type: Boolean,
            default:false
        }
    },
    {
        versionKey: false,
        timeStamps: true,
        toJSON: {
            virtuals: true,
            transform: function(doc,ret){
                delete ret._id;
                return ret;
            },
        },
        toObject:
        {
            virtuals: true,
            transform: function(doc,ret){
                delete ret._id;
                return ret;
            },
        },
    }
);

contactSchema.path('name').validate((value) => {
    const re = /[A-Z]\w+/g;
    return re.test(String(value));
});

const ContactSchema = model('contact', contactSchema);

module.exports = ContactSchema;