import gravatar from "gravatar";

const createAvatar = (email) => {
  const newAvatar = gravatar.url(email);
  return newAvatar;
};

export default createAvatar;
