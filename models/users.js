import User from './../service/schemas/users.js';
import bcrypt from 'bcrypt';

export const listUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    console.log('Error getting user list: ', err);
    throw err;
  }
};

export const addUser = async body => {
  const { email, password } = body;
  const users = await listUsers();
  const userExist = users.find(user => user.email === email);
  if (userExist) return 409;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { ...body, password: hashedPassword };
    await User.create(user);
    return user;
  } catch (err) {
    console.log('Error adding new user: ', err);
    throw err;
  }
};

export const loginUser = async body => {
  const { email, password } = body;
  const users = await listUsers();
  const user = users.find(user => user.email === email);
  if (!user) return false;
  try {
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) return false;
    return user;
  } catch (err) {
    console.log('Error adding new user: ', err);
    throw err;
  }
};
