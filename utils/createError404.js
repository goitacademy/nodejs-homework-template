const create404 = () => {
  const error = new Error('Not found');
  error.status = 404;
  throw error;
};

module.exports = create404;
