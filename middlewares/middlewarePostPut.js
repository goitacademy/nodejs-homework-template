const { joiSchemas } = require("../models/contact");

const { postPutSchema } = joiSchemas;

const middlewarePostPut = async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    try {
      await postPutSchema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json(error.details[0].message);
    }
  } else {
    next();
  }
};

module.exports = middlewarePostPut;
