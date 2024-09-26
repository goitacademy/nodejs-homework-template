const mailTemplate = (hostUrl, token) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
            background-color: #f6f6f6;
        }

        table.container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }

        h1 {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 0 0 20px;
        }


        td.button {
            text-align: center;
            padding: 20px 0;
        }

        a.button {
            display: inline-block;
            background-color: #008cba;
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        a.button:hover {
            background-color: #005d84;
        }

        @media screen and (max-width: 480px) {
            h1 {
                font-size: 20px;
            }


            td.button {
                padding: 10px 0;
            }

            a.button {
                font-size: 14px;
                padding: 8px 16px;
            }
        }
    </style>
</head>
<body>
    <table class="container">
        <tr>
            <td>
                <h1>Please confirm your email address</h1>
                <p>Thank you for signing up! To complete your registration, please click the button below to confirm your email address:</p>
            </td>
        </tr>
        <tr>
            <td class="button">
                <a class="button"target="_blank" href="${hostUrl}/users/verify/${token}">Confirm Email</a>
            </td>
        </tr>
    </table>
</body>
</html>`;
};

module.exports = mailTemplate;
