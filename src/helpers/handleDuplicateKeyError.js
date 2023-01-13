export const handleDuplicateKeyError = ({ keyValue }, res) => {
  const field = Object.keys(keyValue);

  res.status(400).json({
    status: 'error',
    code: 400,
    message: `Contact with that ${field} already exists.`,
    data: 'Bad request',
  });
};
