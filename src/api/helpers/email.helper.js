import fetch from "node-fetch";

export default async (data) => {
	const emailData = {
		Recipients: {
			To: [data.email],
		},
		Content: {
			Body: [
				{
					ContentType: "HTML",
					Content: `
                    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
                        <div style="padding: 20px; text-align: center;">
                            <h1 style="font-size: 24px; color: #333;">AI Calorie Tracker</h1>
                            <p style="font-size: 18px;">${data.message}</p>
                        </div>
                        <div style="padding: 20px; text-align: center;">
                            <p style="font-size: 16px;">Thank you for using our app!</p>
                        </div>
                    </div>`,
					Charset: "UTF-8",
				},
			],
			Postback: "string",
			EnvelopeFrom: process.env.ELASTIC_EMAIL_FROM_EMAIL,
			From: process.env.ELASTIC_EMAIL_FROM_EMAIL,
			Subject: "AI Calorie Tracker",
		},
	};

	const url = "https://api.elasticemail.com/v4/emails/transactional";
	console.log(process.env.ELASTIC_EMAIL_API_KEY);
	const headers = {
		"Content-Type": "application/json",
		"X-ElasticEmail-ApiKey": process.env.ELASTIC_EMAIL_API_KEY,
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify(emailData),
		});

		return await response.json();
	} catch (error) {
		return "Failed to send email";
	}
};
