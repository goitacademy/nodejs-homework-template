const Joi = require("joi")

const singUpShema = Joi.object({
  email: Joi.string().required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  avatarURL: Joi.string()
});

 const singInShchema = Joi.object({
   email: Joi.string().required(),
   password: Joi.string().required(),
 });

module.exports = { singUpShema, singInShchema }