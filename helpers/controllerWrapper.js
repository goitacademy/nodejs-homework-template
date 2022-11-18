const ctrlWrapper = controller => {
    const func = async(req,res,next) => {
        try {
            await controller(req,res,next)
        } catch (error) {
            console.log('-----------------------------------------------------');
            console.log(error);
            console.log('-----------------------------------------------------');
            next(error)
        }
    }
    return func;
}   

module.exports = ctrlWrapper