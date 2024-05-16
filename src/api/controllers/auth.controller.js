import Service from "../services/auth.service.js";

export default {
	async register(request, response, next) {
		try {
			console.log(request.body);
			response.status(201).json(await Service.register(request.body));
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
					sameSite: "none",
					secure: true,
				})
				.json("Logged in");
		} catch (error) {
			next(error);
		}
	},

	async verifyEmail(request, response, next) {
		try {
			console.log(request.body);
			response.status(200).json(await Service.verifyEmail(request.body));
		} catch (error) {
			next(error);
		}
	},

	async logout(request, response, next) {
		try {
			response
				.status(200)
				.clearCookie("access_token", {
					httpOnly: true,
					sameSite: "none",
					secure: process.env.NODE_ENV === "production",
				})
				.send("Logged out");
		} catch (error) {
			next(error);
		}
	},
};
