const createError = require("../routes/api/createError");
const validate = (target)=>(schema)=>(req, res, next) => {
    
    const data = (target === 'body' || target === 'update') ? req.body 
            : {contactId: req.params.contactId}; 
    const result = schema.validate(data);
    if (result.error){
        const newErr = createError('BAD_REQUEST');
        next({...newErr, message: result.error.details[0].message});
    }
    else next();
}

module.exports = validate;