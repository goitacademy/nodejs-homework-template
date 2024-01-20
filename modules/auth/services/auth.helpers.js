import { User } from "../schemas/auth.schema.js";

function signupUser(body) {
  return User.create(body);
}

function loginUser(body) {
  return User.find(body);
}

function logoutUser(body) {
  return User.find(body);
}

function currentUser(body) {
  return User.find(body);
}

export { signupUser, loginUser, logoutUser, currentUser };
