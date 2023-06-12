// const { HttpError } = require("../helpers");

const validateContactsBody = (schema) => {
   const func = (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
		const filedKey = error.details[0].context.key
		if(Object.keys(error._original).length !== 0 || filedKey === "favorite"){
			return res.status(400).json({ message: `missing field ${filedKey}` });
		} 
		return res.status(400).json({ message: `missing fields` });
      }
      next();
   };
   return func;
};

module.exports = {
   validateContactsBody,
};