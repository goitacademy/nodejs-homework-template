module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js"],
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
