import * as bcrypt from 'bcrypt';

const saltRounds = 10;
let secret;
try {
	secret = await bcrypt.hash('super-secret', 10);
} catch (e) {
	console.error(e);
	process.exit(1);
}

export default secret;
