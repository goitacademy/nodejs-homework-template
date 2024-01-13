const serverConfig = {
	mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017',
	dbname: process.env.DB_NAME ?? 'testdb',
	appName: process.env.PROJECT_NAME ?? 'Default name',
	port: process.env.PORT ? +process.env.PORT : 3000,
	environment: process.env.NODE_ENV ?? 'development',
	jwtSecret: process.env.JWT_SECRET ?? 'SECRET',
	jwtExpiration: process.env.JWT_EXPIRATION ?? '1h',
};

module.exports = serverConfig;
