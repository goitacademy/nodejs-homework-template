// const { HttpError } = require('../helpers');
const { HttpError } = require('../helpers/index');

const validateBody = schema => {
    const func = (req, res, next) => {
        // console.log(req.route.methods)
        const reqMethod = Object.keys(req.route.methods).join('');
        // console.log(reqMethod)
        if (reqMethod === 'patch' && Object.keys(req.body).length === 0) throw HttpError(400, "Missing field favorite");
        if (Object.keys(req.body).length === 0) throw HttpError(400, "Missing fields");
        
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            errors: {
                wrap: {
                  label: false
                }
            }
        });
        
        if(error && Object.keys(error._original).length === 3) {
            let errArr = [];
            console.log('original schema error ', error._original)
            for(let key in error._original){
                if(error._original[key].length === 0) errArr.push(key);
            }
            
            throw HttpError(400, `required ${errArr.join(', ')} not allowed to be empty`);
        }

        if (error) {
            console.log('validateBody schema error ', error)
            throw HttpError(400, `missing required ${error.message.replaceAll('.', ',')} field`);
        }

        next();
    }

    return func;
}

module.exports = validateBody;   