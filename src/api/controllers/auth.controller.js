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
			response.status(200).json({
				message: "Logged in successfully",
				accessToken: login.accessToken,
			});
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
};
