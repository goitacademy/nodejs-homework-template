const { HttpError } = require('../helpers')

const validateBody = schema => {
    const func = (req, res, next) => {
        if (Object.keys(req.body).length === 0) throw HttpError(400, "Missing fields");
        
        const { error } = schema.validate(req.body);
        if (error) {
            // console.log('validateBody schema error ', error._original)
            let errArr = [];
            
            for(let key in error._original){
                if(error._original[key].length === 0) errArr.push(key);
            }
            
            throw HttpError(400, `missing required ${errArr.join(', ')} field`);
        }

        next();
    }

    return func;
}

module.exports = validateBody;   