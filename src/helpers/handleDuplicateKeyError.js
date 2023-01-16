export const handleDuplicateKeyError = ({ keyValue }, res) => {
  const field = Object.keys(keyValue);

  res.status(409).json({
    status: 'error',
    code: 409,
    message: ` ${field} already exists.`,
    data: 'Conflict',
  });
};
