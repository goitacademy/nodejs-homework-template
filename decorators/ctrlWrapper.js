const cntrWrapper = cntr => {
    const func = async (req, res, next) => {
        try {
            await cntr(req,res,next)
        } catch (error) {
            next(error)
        }
    }
    return func
}

export default cntrWrapper