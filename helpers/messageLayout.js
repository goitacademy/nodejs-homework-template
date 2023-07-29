const messageLayout = (link) => {
	const body = `
 <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Email Confirmation</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f0f0f0;
				text-align: center;
				margin: 0;
				padding: 20px;
			}

			.container {
				max-width: 600px;
				margin: 0 auto;
				background-color: #fff;
				padding: 40px;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			}

			.header {
				background-color: #96f765;
				color: #007bff;
				padding: 10px;
				border-radius: 5px 5px 0 0;
			}

			.content {
				padding: 20px 0;
			}

			.button {
				text-decoration: none;
				display: inline-block;
				background-color: #96f765;
				color: #007bff;
				padding: 10px 20px;
				border-radius: 5px;
			}

			.footer {
				color: #888;
				padding: 10px 0;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="header">
				<h1>Email Confirmation</h1>
			</div>
			<div class="content">
				<p>Hello there!</p>
				<p>
					Thank you for registering on our platform. To complete your registration, please click the
					button below to confirm your email address:
				</p>
				<p>
					<a class="button" href="${link}">Confirm Email</a>
				</p>
				<p>If you didn't create an account, you can safely ignore this email.</p>
			</div>
			<div class="footer">
				<p>Best regards,</p>
				<p>Davydiuk Dmytro</p>
			</div>
		</div>
	</body>
</html>

    `;
	return body;
};

module.exports = messageLayout;
