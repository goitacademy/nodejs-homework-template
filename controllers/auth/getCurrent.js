const getCurrent = (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        res.json({
            status: "ok",
            code: 200,
            user: {
                email,
                subscription,
            }
        })
        
    } catch (error) {
        next(error);
    
   }
}

module.exports = getCurrent;