const cntrlWrapper = cntrl => {
<<<<<<< HEAD:helpers/cntrlWrapper.js
=======

>>>>>>> b2b353669b449349822edecb08b428e80cfd37d8:controllers/cntrlWrapper.js
    const func = async(req, res, next) => {
        try {
            await cntrl(req, res, next);
        }
        catch (error) {
            next(error);

        }
    }
    return func;
}

module.exports = cntrlWrapper;