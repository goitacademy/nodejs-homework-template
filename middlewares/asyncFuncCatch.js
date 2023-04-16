const asyncFuncCatch =  (func) => {

    const newFunc = async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            next(error)
        }
    } 

    return newFunc
}

module.exports = asyncFuncCatch