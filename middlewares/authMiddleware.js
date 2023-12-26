const { checkToken } = require("../services/jwtServices");
const { getUserById } = require("../services/usersServices");
const { authUserDataValidator } = require("../utils/usersValidator");


const checkAuthUser = (req, res, next) => {
    const {value, error} = authUserDataValidator(req.body);
    req.body = value;

    if (error) {
        const validationError = new Error("Incorrect email or password!");
        validationError.status = 400;
        throw validationError;
      
    
    }
    next();

}


const protectToken = async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
    const userId = checkToken(token);
  
    if (!userId) throw new Error(401, 'Not authorized');
  
    const currentUser = await getUserById(userId);
  
    if (!currentUser) throw new Error(401, 'Not authorized');
  
    req.user = currentUser;
    
    next();
  };
  

module.exports = {
    checkAuthUser,
    protectToken
}