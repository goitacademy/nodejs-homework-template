const validation = (schema)=> {
    return (req, res, next) => {
        
        const {error} = schema.validate(req.body);
       
        
        if (error) {
            error.status = 400;
           res.status(400).json({
                status: "error",
                code: 400,
               ResponseBody: "Помилка від Joi або іншої бібліотеки валідації" 
            })
        }
         next()
    }
}

module.exports = validation;