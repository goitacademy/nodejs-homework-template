import Joi from "joi";

const favoriteValid = Joi.object({
   favorite: Joi.boolean().required()
})

export default  favoriteValid;