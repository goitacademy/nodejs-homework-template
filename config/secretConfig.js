const secretConfig = {

	jwtSecret: process.env.JWT_SECRET ?? 'SECRET',
	jwtExpiration: process.env.JWT_EXPIRATION ?? '1h',
}

module.exports = secretConfig;