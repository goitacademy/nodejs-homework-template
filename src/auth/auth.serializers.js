const serializerUserResponse = (user, token)=> {
return {user: serializeUser(user),token}
};

const serializeUser =(user)=>{
    return {
        subscription: user.subscription,
        email: user.email,
        id: user.id
    }
}
exports.serializerUserResponse = serializerUserResponse