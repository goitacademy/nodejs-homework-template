const UsersService = require('../../services/users');
const usersService = new UsersService();

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await usersService.getUser(email,password);
        if(!user) {
            return res.status(401).json({status: 'error', code:401, message:'Email or password is wrong'})
        }

        const {id, email:Email,subscription} = user;
        const token = usersService.getToken(user);
        await usersService.setToken(id, token);

        return res.status(200).json({token:token, user:{email:Email,subscription}});

    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
    
}

module.exports = loginUser;