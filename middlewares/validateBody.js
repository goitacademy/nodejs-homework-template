const { HttpErorr } = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
           console.log("validateBody.req.body", req.body);
        const { error } = schema.validate(req.body);
     
        if (error) {
            next(HttpErorr(400, error.message));
        }
        next()
    }
    return func;
} 

module.exports = validateBody;