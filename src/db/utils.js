const { DB_PROTOCOL, DB_USER, DB_PASS, DB_HOST } = process.env;

const getConnectionURI = () => {
  return `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/db-contacts?retryWrites=true&w=majority`;
};

module.exports = {
  getConnectionURI,
};
