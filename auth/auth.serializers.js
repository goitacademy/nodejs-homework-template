function serializeUserResponse(user) {
  return { user: serializeUser(user) };
}

// function serializeUserListResponse(users) {
//   return { users: users.map(serializeUser) };
// }

function serializeUser(user) {
  return {
    email: user.email,
    subscription: user.subscription,
  };
}

exports.serializeUserResponse = serializeUserResponse;
// exports.serializeUserListResponse = serializeUserListResponse;
// exports.serializeUser = serializeUser;

exports.serializeLoginResponse = (user, token) => {
  user = serializeUser(user);
  return { user, token };
};
