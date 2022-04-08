  const { Unauthorized,Forbidden} = require('http-errors')

  const jwt = require('jsonwebtoken');
const { getConfig } = require('../config');

exports.authorize=(...permissions)=>{
    return (req, res, next)=>{
   // 1. get token from request +
   // 2. verify JWT token 
   // 3. throw 401 if verification failed
   // 4. check permissions
   // 5. if user does not one of permissions - throw 403 error
   // 6. set req.userId from JWT token
   // 7. next

   const authHeader = req.headers['authorization'] || '';
   
   const token = authHeader.replace('Bearer ', '');

   console.log('token', token)

   let payload;
   const config = getConfig();

   try {
       payload = jwt.verify(token, config.jwt.secret )
   } catch (error) {
       throw new Unauthorized('Not authorized')
   }

   const isPermission = checkPermissions(payload.permissions, permissions);
    if(!isPermission) {
        throw  new Forbidden()
    }

    req.userId = payload.uid;
    next();

    }
}

function checkPermissions (tokenPermissions, requiredPermissions){
    let hasPermission = false;

    if(!requiredPermissions.length) {
        return true
    }

    requiredPermissions.forEach(perm => {
        if(tokenPermissions.includes(perm)){
            hasPermission = true;
        }
    });
    return hasPermission;
}