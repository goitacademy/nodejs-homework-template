import gravatar from "gravatar";

const createAvatar = (email) => {
  const newAvatar = gravatar.url(email, { s: 250, protocol: "https" });
  return newAvatar;
};

export default createAvatar;
