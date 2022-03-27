const usersService = require('../../services/users');

const signupUser = async (req, res, next) => {
    try {
        const {email} = req.body;
        const isUserExist = await usersService.isUserExist(email);
        if(isUserExist) {
            return res.status(409).json({status: 'error', code:409, message:'Email in use'})
        }
        const user = await usersService.create(req.body);
        return res.status(201).json({user:user});

    } catch (error) {
        next(error)
    }
}

module.exports = signupUser;