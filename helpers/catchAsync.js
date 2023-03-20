const catchAsync = (controller) => {
    return (req, res, next) => {
        controller(req,res).catch(next)
    }
}
module.exports = {
    catchAsync,
}