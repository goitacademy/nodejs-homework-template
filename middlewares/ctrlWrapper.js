const ctrlWrapper = (ctrl)=> {
    const func = async(req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            if(error.message.includes("Cast to ObjectId failed")){
                error.status = 404;
            }
            next(error)
        }
    }

    return func;
}

module.exports = ctrlWrapper