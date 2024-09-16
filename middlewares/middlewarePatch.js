const { joiSchemas } = require("../models/contact");

const { patchSchema } = joiSchemas;

const middlewarePatch = async (req, res, next) => {
  if (req.method === "PATCH") {
    if (JSON.stringify(req.body) === "{}") {
        res.status(400).json({ message: "missing field favorite" })
        return
    }
    try {
      await patchSchema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  } else {
    next();
  }
};

module.exports = middlewarePatch;
