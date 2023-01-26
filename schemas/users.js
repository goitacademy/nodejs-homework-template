const Joi = require("joi");
const {emailRegexp, phoneRedexp} = require('../helpers/regExp');
const {subscription} = require('../helpers/subscriprion');

const register = Joi.object({
    // name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(phoneRedexp).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription:Joi.string().valid(...subscription),
});
// const login = Joi.object({
//     phone: Joi.string().pattern(phoneRedexp).required(),
//     email: Joi.string().pattern(emailRegexp).required(),
// });
module.exports = {
    register,
    // login
}