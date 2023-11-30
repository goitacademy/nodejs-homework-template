const { Schema, model } = require('mongoose');



const contactSchema= new Schema(  {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required:true,
    },
  });

  contactSchema.post("save", (error, data, next) =>{
    error.status = 400;
    next();
  })


   contactSchema.pre("findOneAndUpdate", function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
});



  contactSchema.post("findOneAndUpdate",(error, data, next) =>{
    error.status = 400;
    next();
  })
const Contact=model('contact', contactSchema);

module.exports = {
    Contact,
  };

