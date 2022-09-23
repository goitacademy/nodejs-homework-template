const app = require('./app');

app.listen(3000 || 8080, () => {
	console.log('Server running. Use our API on port: 3000');
});