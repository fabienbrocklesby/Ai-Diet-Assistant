import Service from "../services/auth.service.js";

export default {
	async register(request, response, next) {
		try {
			console.log(request.body);
			response.status(201).send(await Service.register(request.body));
		} catch (error) {
			next(error);
		}
	},

	async login(request, response, next) {
		try {
			console.log(request.body);
			const login = await Service.login(request.body);
			response
				.status(200)
				.cookie("access_token", login.accessToken, {
					httpOnly: true,
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
					sameSite: "strict",
					secure: process.env.NODE_ENV === "production",
				})
				.send("Logged in");
		} catch (error) {
			next(error);
		}
	},

	async verifyEmail(request, response, next) {
		try {
			console.log(request.body);
			response.status(200).send(await Service.verifyEmail(request.body));
		} catch (error) {
			next(error);
		}
	},
};
