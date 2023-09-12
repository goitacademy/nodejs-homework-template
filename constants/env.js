const { MONGO_DB_USER, MONGO_DB_PASWORD, MONGO_DB_HOST, MONGO_DB_DATABASE } =
  process.env;

if (!MONGO_DB_USER) {
  throw new Error("Please setuo MONGO_DB_USER");
}

if (!MONGO_DB_PASWORD) {
  throw new Error("Please setuo MONGO_DB_PASWORD");
}

if (!MONGO_DB_HOST) {
  throw new Error("Please setuo MONGO_DB_HOST");
}

if (!MONGO_DB_DATABASE) {
  throw new Error("Please setuo MONGO_DB_DATABASER");
}

module.exports = {
  MONGO_DB_USER,
  MONGO_DB_PASWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
};
