const {findByVerifyToken, updateVerifyToken} = require('../../repository/users');

const verifyUser = async (req, res, next) => {
    try {
        const {token} = req.params;
        const verifyToken = await findByVerifyToken(token);
        if(verifyToken) {
            await updateVerifyToken(verifyToken.id,true);
            return res.status(200).json({message:'Verification successful'});
        }
        
        return res.status(404).json({message: 'User not found'});

    } catch (error) {
        next(error)
    }
    
}

module.exports = verifyUser;