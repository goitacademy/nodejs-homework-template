const ctrlWrapper = (ctrl)=> {
    return async(req, res, next)=> {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            res.status(404).json({ message: 'Not found' });
            next(error);
        }
    }
}

module.exports = ctrlWrapper;