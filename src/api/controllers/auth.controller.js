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
			response.status(200).send(await Service.login(request.body));
		} catch (error) {
			next(error);
		}
	},
};
