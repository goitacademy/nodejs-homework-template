import Joi from "joi";

const favoriteSchema = Joi.object({
   favorite: Joi.boolean().required()
})

export default  favoriteSchema;