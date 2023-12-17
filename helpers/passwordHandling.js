import bCrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bCrypt.genSalt(10);
  const hash = await bCrypt.hash(password, salt);
  return hash;
};

const validatePassword = (password, hash) => bCrypt.compare(password, hash);

export const passwordValidator = async (password, userPassword) => {
  const isValidPassword = await validatePassword(password, userPassword);
  return isValidPassword;
};
