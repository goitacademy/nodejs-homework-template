const tryCatchWrapper = fun => {
    const wrapFun = async (req, res, next) => {
        try {
            await fun(req, res, next)
        }
        catch (err) {
            next(err);
        }
    }

    return wrapFun;
}

export default tryCatchWrapper;