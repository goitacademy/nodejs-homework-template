const ctrlWrapper = ctrl => {
    const func = async(req, res, next) => {
        try {
            await ctrl(req, res, next);
            console.log("піймалося")
        }
        catch(error) {
            next(error);
        }
    }

    return func;
}

export default ctrlWrapper;