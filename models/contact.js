
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {handleMongooseError} = require('../middlewares');
// const {handleMongooseError} = require('../Utils')

const contactsSchema = new Schema(  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
    
},
  {
  // timestamps: true,
versionKey: false
}
)
  
contactsSchema.post("save", handleMongooseError);


const addSchema = Joi.object({
    name: Joi.string().min(3).max(30),
        
     email: Joi.string().email({ minDomainSegments: 2}),
            
    phone: Joi.string().min(10),
    
    favorite: Joi.boolean()
      
})

const isFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required
})

const schemas = {
  addSchema,
  isFavoriteSchema
} 
    


const Contact = model("contact", contactsSchema);

module.exports = {
    Contact,
    schemas
};


// const schemas = {
//     addSchema,
//     updateFavoriteSchema,
// }

// const Book = model("book", bookSchema);

// module.exports = {
//     Book,
//     schemas,
// }