const Joi = require("joi");
const {emailRegexp} = require('../helpers/regExp');
// const subscription = require('../helpers/subscriprion');

const userSchema = Joi.object({
    // name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription:Joi.string(),
    // subscription:Joi.string().valid(...subscription),
});
// const login = Joi.object({
//     phone: Joi.string().pattern(phoneRedexp).required(),
//     email: Joi.string().pattern(emailRegexp).required(),
// });
module.exports = {
    userSchema,
    // login
}