const cntrlWrapper = cntrl => {
<<<<<<< HEAD
    const func = async(req, res, next) => {
        try {
            await cntrl(req, res, next);
=======
    const func = async(requirement, response, next) => {
        try {
            await cntrl(requirement, response, next);
>>>>>>> master
        }
        catch (error) {
            next(error);

        }
    }
    return func;
}

module.exports = cntrlWrapper;