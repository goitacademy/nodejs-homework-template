const { DB_USER, DB_PASS, DB_PROTOCOL, DB_HOST } = process.env;

const getConnectionURI = () => {
  return `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`;
};

module.exports = {
  getConnectionURI,
};
