const validation =  (schema) =>{
    return (req,res,next)=>{
       const {error} = schema.validate(req.body);
        if(error) {
            error.status = 400;
            throw error;
        } 
        next();
    }
}

module.exports = validation;