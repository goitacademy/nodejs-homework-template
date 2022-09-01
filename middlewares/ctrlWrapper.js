const ctrlWrapper = contactsCtrl => {
    return async (req, res, next) => {
        try {
            await contactsCtrl(req, res, next);
        } catch (error) {
            next(error);
        }
        
    };
};

module.exports = ctrlWrapper;
