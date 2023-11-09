export const getCurrent = ({ user }, res) => {
  const { name, email } = user;
  res.json({ name, email });
};
