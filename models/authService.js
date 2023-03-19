const { User } = require('../db/userModel');
// const {NotAuthorizedError} = require ('../helpers/errors')

// const Joi = require("joi");

// const contactsJoiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });


const registration = async (req, res) => {
    const { email, password } = req.body;
    const user = new User({
        email, password
    });
    await user.save();

  res.json({})
};



const login = async (req, res) => {
  
  res.json({ status: 'success' });
};



module.exports = {
  registration,
  login,
}
