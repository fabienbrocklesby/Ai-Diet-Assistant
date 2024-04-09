import Service from "../services/auth.service.js";

class AuthController {
	async register(request, response) {
		console.log(request.body);
		const result = await Service.register(request.body);
		response.send(result);
	}

	async login(request, response) {
		const result = await Service.login();
		response.send(result);
	}
}

export default new AuthController();
