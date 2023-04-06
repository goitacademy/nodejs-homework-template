

const srializeUser=(user)=>{
    return {
      id: user._id,
      passwordHash: user.passwordHash,
      subscription: user.subscription,
      token: user.token,
      avatarURL: user.avatarURL
    };
}

const serializeUserResponse=(user)=>{
    return { user: srializeUser(user)};
}

const serializeSingInRespons=(userWithToken)=>{
return {
  user: srializeUser(userWithToken.user),
  token: userWithToken.token,
};
}

module.exports = { serializeUserResponse, serializeSingInRespons };