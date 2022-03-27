
const currentUser = async (req,res,next) => {
    try {
        const {email, subscription} = req.user;
        return res.status(200).json({user:{email,subscription}});

    } catch (error) {
        next(error)
    }
}

module.exports = currentUser;